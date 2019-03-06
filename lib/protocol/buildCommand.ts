import mapFromFrameType from './mapFromFrameType';
import { FrameType } from './types';

export interface ProtocolCommandInput {
  type: FrameType;
  id: number;
  value?: string;
}

export interface ProtocolCommand extends ProtocolCommandInput {
  raw: string;
  id: number;
  answerTimeout: number;
}

export interface ProtocolCommandOptions {
  answerTimeout: number;
}

export function buildCommand(
  cmdInput: ProtocolCommandInput,
  options?: ProtocolCommandOptions
): ProtocolCommand {
  const { type, value, id } = cmdInput;
  const raw = value
    ? `%${mapFromFrameType(type)}#${id}$${value}\r`
    : `%${mapFromFrameType(type)}#${id}\r`;
  const answerTimeout = options ? options.answerTimeout : 5000;
  return Object.assign({}, cmdInput, { raw, answerTimeout });
}
