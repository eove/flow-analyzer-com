import {
  ProtocolAnswer,
  ProtocolCommand,
  ProtocolCommandInput
} from '../protocol';

export interface DomainCommand {
  type: string;
  payload?: object;
}

export interface DomainAnswer {
  payload: any;
}

export interface DomainCommandHandler {
  type: string;
  handle: (command?: DomainCommand) => Promise<DomainAnswer>;
}

export interface DomainCommandHandlerFactoryDependencies {
  runCommand: (command: ProtocolCommand) => Promise<ProtocolAnswer>;
  buildCommand: (command: ProtocolCommandInput) => ProtocolCommand;
}

export type DomainCommandHandlerFatory = (
  dependencies: DomainCommandHandlerFactoryDependencies
) => DomainCommandHandler;
