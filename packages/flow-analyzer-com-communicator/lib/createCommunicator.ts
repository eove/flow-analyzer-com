import * as debugLib from 'debug';
import * as _ from 'lodash';
import { merge, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { commandHandlerFactories, DeviceTypes, DomainCommand } from './domain';
import { buildCommand, findAnswers } from './protocol';
import {
  CommandError,
  createCommandRunner,
  createTransport,
  Device,
} from './tools';

export interface Communicator {
  open: (portName: string) => Promise<void>;
  close: () => Promise<void>;
  dispose: () => Promise<void>;
  listPorts: () => Promise<Device[]>;
  sendCommand: (command: DomainCommand) => Promise<{}>;
  request: (commandType: string, args: any) => Promise<{}>;
  data$: Observable<unknown>;
  event$: Observable<unknown>;
  answer$: Observable<unknown>;
  command$: Observable<unknown>;
}

interface CommunicatiorOptions {
  label?: string;
  debugEnabled?: boolean;
  transportDebugEnabled?: boolean;
  rs232echoOn?: boolean;
  translate?: (msg: string) => string;
}

export function createCommunicator(
  options?: CommunicatiorOptions
): Communicator {
  const { label, debugEnabled, transportDebugEnabled, rs232echoOn, translate } =
    _.defaults(options, {
      label: 'analyzer',
      debugEnabled: false,
      transportDebugEnabled: false,
      rs232echoOn: false,
      translate: (msg: string) => msg,
    });
  let deviceType: DeviceTypes = DeviceTypes.PF300;
  const debug = debugLib(label);
  debug.enabled = debugEnabled;

  const eventSource = new Subject();

  const transport = createTransport({ debugEnabled: transportDebugEnabled });
  const commandRunner = createCommandRunner({
    debug,
    buildCommand,
    findAnswers,
    handlerFactories: [
      ...commandHandlerFactories.measurements,
      ...commandHandlerFactories.settings,
      ...commandHandlerFactories.system,
      ...commandHandlerFactories.execute,
    ],
    data$: transport.data$,
    transport,
    translate,
  });
  const runnerErrorSubscription = commandRunner.error$
    .pipe(filter((e) => e.type === CommandError.WriteError))
    .subscribe(async (e) => {
      try {
        debug(`${e.type} error, closing connection`);
        await close();
      } catch (error) {
        debug(`could not close connection (${error.message})`);
      }
    });

  return {
    open,
    close,
    dispose,
    listPorts,
    get data$() {
      return transport.data$;
    },
    get answer$() {
      return commandRunner.answer$;
    },
    get command$() {
      return commandRunner.command$;
    },
    get event$() {
      return merge(transport.event$, eventSource.asObservable());
    },
    sendCommand,
    request,
  };

  async function open(portName: string): Promise<void> {
    try {
      await transport.connect(portName);
      await sendCommand({
        type: 'EXEC_SET_RS232_ECHO',
        payload: { echoOn: rs232echoOn },
      });
      const serial = await sendCommand({
        type: 'READ_SERIAL_NUMBER',
      });
      if (_.isEmpty(serial)) {
        throw new Error(translate('flow analyzer not responding'));
      }
      deviceType = await sendCommand({
        type: 'READ_DEVICE_TYPE',
      });
      _sendEvent({
        type: 'COMMUNICATION_STARTED',
        payload: {
          portName,
          serial,
          deviceType,
        },
      });
    } catch (error) {
      _sendEvent({
        type: 'COMMUNICATION_START_FAILED',
        payload: {
          portName,
        },
      });
      throw error;
    }
  }

  function close(): Promise<void> {
    return transport.disconnect().then((result) => {
      _sendEvent({ type: 'COMMUNICATION_STOPPED', payload: undefined });
      return result;
    });
  }

  function dispose(): Promise<void> {
    runnerErrorSubscription.unsubscribe();
    return Promise.resolve();
  }

  function sendCommand(command: DomainCommand): Promise<any> {
    return commandRunner.postCommand(
      Object.assign({}, command, { deviceType })
    );
  }

  function request(commandType: string, args: any) {
    debug(`received shell command to run: ${commandType}`);
    return sendCommand({ type: commandType, payload: args });
  }

  function listPorts(): Promise<Device[]> {
    return transport.discover();
  }

  function _sendEvent(event: { type: string; payload: any }) {
    debug(`sent event ${event.type}`);
    eventSource.next(event);
  }
}
