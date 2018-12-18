export enum AnswerType {
  READ_MEASUREMENT = 'READ MEASUREMENT',
  READ_SYSTEM_INFO = 'READ SYSTEM INFO',
  READ_STATE = 'READ STATE',
  WRITE_SETTING = 'WRITE SETTING',
  READ_SETTING = 'READ SETTING',
  EXECUTE_COMMAND = 'EXECUTE COMMAND',
  UNKOWN = 'UNKNOWN'
}

export interface Answer {
  type: AnswerType;
  id: string;
  value: string;
  raw: string;
}

export interface FindAnswerResult {
  answers: Answer[];
  remaining: string[];
}

const FRAME_PATTERN = /%(\w{2})#(\w+)\$(\w+)\r/;

export function findAnswer(data: string[]): FindAnswerResult {
  let index = 0;
  const answers: Answer[] = [];

  while (index < data.length) {
    if (data[index] === '%') {
      const found = data
        .slice(index)
        .join('')
        .match(FRAME_PATTERN);

      if (found) {
        const [raw, type, id, value] = found;
        answers.push({
          type: mapToAnswerType(type),
          id,
          value,
          raw
        });
        index += raw.length - 1;
      }
      index++;
    } else {
      index++;
    }
  }
  return {
    answers,
    remaining: []
  };
}

function mapToAnswerType(data: string): AnswerType {
  switch (data) {
    case 'RS':
      return AnswerType.READ_SETTING;
    case 'WS':
      return AnswerType.WRITE_SETTING;
    case 'RM':
      return AnswerType.READ_MEASUREMENT;
    case 'RI':
      return AnswerType.READ_SYSTEM_INFO;
    case 'ST':
      return AnswerType.READ_STATE;
    case 'CM':
      return AnswerType.EXECUTE_COMMAND;
    default:
      return AnswerType.UNKOWN;
  }
}
