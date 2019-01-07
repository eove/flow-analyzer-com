import { FrameType, mapFromFrameType } from './FrameType';

export interface ProtocolCommandInput {
  type: FrameType;
  id: string;
  value?: string;
}

export interface ProtocolCommand extends ProtocolCommandInput {
  raw: string;
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
