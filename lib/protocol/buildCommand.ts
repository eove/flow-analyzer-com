import { FrameType, mapFromFrameType } from './FrameType';

export interface ProtocolCommandInput {
  type: FrameType;
  id: string;
  value?: string;
}

export interface ProtocolCommand extends ProtocolCommandInput {
  raw: string;
}

export function buildCommand(cmdInput: ProtocolCommandInput): ProtocolCommand {
  const { type, value, id } = cmdInput;
  const raw = value
    ? `%${mapFromFrameType(type)}#${id}$${value}\r`
    : `%${mapFromFrameType(type)}#${id}\r`;
  return Object.assign({}, cmdInput, { raw });
}
