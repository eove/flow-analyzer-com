import { FrameType, ProtocolAnswer } from './types';

export function isAnswerValid(answer: ProtocolAnswer): boolean {
  return answer.type !== FrameType.INVALID;
}
