import { createMessageBus } from '@arpinum/messaging';
import { Observable } from 'rxjs';
import { DomainAnswer, DomainCommand } from './domain';
import { createCommandRunner, createConnectionManager } from './tools';

interface Communicator {
  open: (portName: string) => Promise<void>;
  close: () => Promise<void>;
  sendCommand: (command: DomainCommand) => Promise<DomainAnswer>;
  data$: Observable<{}>;
  answer$: Observable<{}>;
}

export default function createCommunicator(): Communicator {
  const connectionManager = createConnectionManager();
  const commandRunner = createCommandRunner({ messageBus, data$ });

  return {
    open,
    close,
    get data$() {
      return connectionManager.data$;
    },
    get answer$() {
      return commandRunner.answer$;
    },
    sendCommand
  };

  function open(portName: string): Promise<void> {
    return connectionManager.connect(portName);
  }

  function close(): Promise<void> {
    return connectionManager.disconnect();
  }

  function sendCommand(command: DomainCommand): Promise<DomainAnswer> {
    return messageBus.post(command);
  }
}
