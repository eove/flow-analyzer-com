import { findAnswers } from './findAnswers';
import { FrameType } from './types';

describe('Finding answers', () => {
  it('should return first remaining bytes', () => {
    const data = ['%', 'W', 'S'];

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [],
      remaining: ['%', 'W', 'S']
    });
  });

  it('should return answers and no remaining bytes when correct data', () => {
    const data = ['%', 'R', 'S', '#', '1', '2', '$', '1', '2', '4', '\r'];
    data.push(...['%', 'R', 'M', '#', '2', '5', '$', '1', '0', '0', '\r']);

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [
        {
          type: FrameType.READ_SETTING,
          id: '12',
          value: '124',
          raw: '%RS#12$124\r'
        },
        {
          type: FrameType.READ_MEASUREMENT,
          id: '25',
          value: '100',
          raw: '%RM#25$100\r'
        }
      ],
      remaining: []
    });
  });

  it('should return answers with no payload', () => {
    const data = ['%', 'C', 'M', '#', '5', '\r'];

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [
        {
          type: FrameType.EXECUTE_COMMAND,
          id: '5',
          value: undefined,
          raw: '%CM#5\r'
        }
      ],
      remaining: []
    });
  });

  it('should ignore noise between answers', () => {
    const data = ['%', 'R', 'S', '#', '1', '2', '$', '1', '2', '4', '\r'];
    data.push(...['n', 'o', 'i', 's', 'e', ' ', 'c', 'h', 'a', 'r', 's']);
    data.push(...['%', 'R', 'M', '#', '2', '5', '$', '1', '0', '0', '\r']);

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [
        {
          type: FrameType.READ_SETTING,
          id: '12',
          value: '124',
          raw: '%RS#12$124\r'
        },
        {
          type: FrameType.READ_MEASUREMENT,
          id: '25',
          value: '100',
          raw: '%RM#25$100\r'
        }
      ],
      remaining: []
    });
  });

  it('should return remaining bytes when incomplete answer', () => {
    const data = ['%', 'R', 'S', '#', '1', '2', '$', '1', '2', '4', '\r'];
    data.push(...['%', 'R', 'M', '#', '2', '5']);

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [
        {
          type: FrameType.READ_SETTING,
          id: '12',
          value: '124',
          raw: '%RS#12$124\r'
        }
      ],
      remaining: ['%', 'R', 'M', '#', '2', '5']
    });
  });

  it('should return invalid answer', () => {
    const data = ['%', 'R', 'S', '#', '1', '2', '$', '1', '2', '4', '\r'];
    data.push('?');
    data.push(...['%', 'W', 'S', '#', '2', '5', '$', '1', '0', '0', '\r']);

    const result = findAnswers(data);

    expect(result).toEqual({
      answers: [
        {
          type: FrameType.READ_SETTING,
          id: '12',
          value: '124',
          raw: '%RS#12$124\r'
        },
        {
          type: FrameType.INVALID,
          raw: '?'
        },
        {
          type: FrameType.WRITE_SETTING,
          id: '25',
          value: '100',
          raw: '%WS#25$100\r'
        }
      ],
      remaining: []
    });
  });
});
