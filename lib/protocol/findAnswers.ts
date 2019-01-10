import mapToFrameType from './mapToFrameType';
import { FrameType, ProtocolAnswer } from './types';

export interface FindAnswerResult {
  answers: ProtocolAnswer[];
  remaining: string[];
}

const ANSWER_PATTERN_WITH_PAYLOAD = /%(\w{2})#(\w+)\$((\-|\w)+)\r/;
const ANSWER_PATTERN_WITHOUT_PAYLOAD = /%(\w{2})#(\w+)\r/;

export function findAnswers(data: string[]): FindAnswerResult {
  let index = 0;
  let lastFoundEndIndex = -1;
  const answers: ProtocolAnswer[] = [];

  while (index < data.length) {
    if (data[index] === '?') {
      answers.push({
        type: FrameType.INVALID,
        raw: '?'
      });
      lastFoundEndIndex = index;
    }
    if (data[index] === '%') {
      const found = findAnswerAtIndex(data, index);

      if (found) {
        const [raw, type, id, value] = found;
        answers.push({
          type: mapToFrameType(type),
          id,
          value,
          raw
        });
        index += raw.length - 1;
        lastFoundEndIndex = index;
      }
      index++;
    } else {
      index++;
    }
  }
  return {
    answers,
    remaining: data.slice(lastFoundEndIndex + 1)
  };

  function findAnswerAtIndex(d: string[], i: number) {
    const foundWithPayload = d
      .slice(i)
      .join('')
      .match(ANSWER_PATTERN_WITH_PAYLOAD);
    if (foundWithPayload) {
      return foundWithPayload;
    }
    const foundWithoutPayload = d
      .slice(i)
      .join('')
      .match(ANSWER_PATTERN_WITHOUT_PAYLOAD);

    return foundWithoutPayload;
  }
}
