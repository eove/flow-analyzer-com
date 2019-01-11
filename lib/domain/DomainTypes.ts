import {
  ProtocolAnswer,
  ProtocolCommand,
  ProtocolCommandInput,
  ProtocolCommandOptions
} from '../protocol';

type DomainCommandPayload = any;

export interface DomainCommand {
  type: string;
  payload?: DomainCommandPayload;
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

export type DomainCommandHandlerFactory = (
  dependencies: DomainCommandHandlerFactoryDependencies
) => DomainCommandHandler;
