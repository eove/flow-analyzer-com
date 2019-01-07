import * as debugLib from 'debug';
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

export function createCommunicator(): Communicator {
  const debug = debugLib('communicator');
  const transport = createTransport({ debugEnabled: true });
  const commandRunner = createCommandRunner({
    debug,
    buildCommand,
    findAnswers,
    handlerFactories: [
      ...commandHandlerFactories.measurements,
      ...commandHandlerFactories.settings
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
    return transport.connect(portName);
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
