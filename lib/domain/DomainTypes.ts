import {
  ProtocolAnswer,
  ProtocolCommand,
  ProtocolCommandInput,
  ProtocolCommandOptions
} from '../protocol';

interface DomainCommandPayload {
  name: string;
  value?: string;
}

export interface DomainCommand {
  type: string;
  payload: DomainCommandPayload;
}

export interface DomainCommandHandler {
  type: string;
  handle: (payload: any) => Promise<{}>;
}

export interface DomainCommandHandlerFactoryDependencies {
  runCommand: (command: ProtocolCommand) => Promise<ProtocolAnswer>;
  buildCommand: (
    command: ProtocolCommandInput,
    options?: ProtocolCommandOptions
  ) => ProtocolCommand;
  debug: (...args: any) => undefined;
}

export type DomainCommandHandlerFatory = (
  dependencies: DomainCommandHandlerFactoryDependencies
) => DomainCommandHandler;
