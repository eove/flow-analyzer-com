import { FrameType, mapFromFrameType } from './FrameType';

interface CommandInput {
  type: FrameType;
  id: string;
  value?: string;
}

interface Command extends CommandInput {
  raw: string;
}

export function buildCommand(cmdInput: CommandInput): Command {
  const { type, value, id } = cmdInput;
  const raw = value
    ? `%${mapFromFrameType(type)}#${id}$${value}\r`
    : `%${mapFromFrameType(type)}#${id}\r`;
  return Object.assign({}, cmdInput, { raw });
}
