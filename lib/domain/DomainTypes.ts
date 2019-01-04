import {
  ProtocolAnswer,
  ProtocolCommand,
  ProtocolCommandInput
} from '../protocol';

export interface DomainCommand {
  type: string;
  payload?: object;
}

export interface DomainAnswer {}

export interface DomainCommandHandler {
  type: string;
  handle: (command?: DomainCommand) => Promise<DomainAnswer>;
}

export interface DomainCommandHandlerFactoryDependencies {
  runCommand: (command: ProtocolCommand) => Promise<ProtocolAnswer>;
  buildCommand: (command: ProtocolCommandInput) => ProtocolCommand;
  debug: (...args: any) => undefined;
}

export type DomainCommandHandlerFatory = (
  dependencies: DomainCommandHandlerFactoryDependencies
) => DomainCommandHandler;
