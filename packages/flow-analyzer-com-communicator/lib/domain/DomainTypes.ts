import {
  ProtocolAnswer,
  ProtocolCommand,
  ProtocolCommandInput,
  ProtocolCommandOptions,
} from '../protocol';
import { DeviceType } from './DeviceType';

type DomainCommandPayload = any;

export interface DomainCommand {
  type: string;
  deviceType?: DeviceType;
  payload?: DomainCommandPayload;
}

export interface DomainCommandHandler {
  type: string;
  handle: (payload: any) => Promise<{} | undefined>;
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
