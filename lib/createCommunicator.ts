import * as debugLib from 'debug';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { DomainCommand } from './domain';
import { commandHandlerFactories } from './domain';
import { buildCommand, findAnswers } from './protocol';
import { createCommandRunner, createTransport } from './tools';

export interface Communicator {
  open: (portName: string) => Promise<void>;
  close: () => Promise<void>;
  sendCommand: (command: DomainCommand) => Promise<{}>;
  request: (commandType: string, args: any) => Promise<{}>;
  data$: Observable<{}>;
  answer$: Observable<{}>;
}

interface CommunicatiorOptions {
  debugEnabled?: boolean;
  transportDebugEnabled?: boolean;
  rs232echoOn?: boolean;
}

export function createCommunicator(
  options?: CommunicatiorOptions
): Communicator {
  const debug = debugLib('communicator');
  const { debugEnabled, transportDebugEnabled, rs232echoOn } = _.defaults(
    options,
    {
      debugEnabled: false,
      transportDebugEnabled: false,
      rs232echoOn: false
    }
  );
  debug.enabled = debugEnabled;

  const transport = createTransport({ debugEnabled: transportDebugEnabled });
  const commandRunner = createCommandRunner({
    debug,
    buildCommand,
    findAnswers,
    handlerFactories: [
      ...commandHandlerFactories.measurements,
      ...commandHandlerFactories.settings,
      ...commandHandlerFactories.system,
      ...commandHandlerFactories.execute
    ],
    data$: transport.data$,
    transport
  });

  return {
    open,
    close,
    get data$() {
      return transport.data$;
    },
    get answer$() {
      return commandRunner.answer$;
    },
    sendCommand,
    request
  };

  function open(portName: string): Promise<void> {
    debug('rs232 echo', rs232echoOn);
    return transport.connect(portName).then(result =>
      sendCommand({
        type: 'EXEC_SET_RS232_ECHO',
        payload: { echoOn: rs232echoOn }
      }).then(() => result)
    );
  }

  function close(): Promise<void> {
    return transport.disconnect();
  }

  function sendCommand(command: DomainCommand): Promise<any> {
    return commandRunner.postCommand(command);
  }

  function request(commandType: string, args: any) {
    debug(`received shell command to run: ${commandType}`);
    return sendCommand({ type: commandType, payload: args });
  }
}
