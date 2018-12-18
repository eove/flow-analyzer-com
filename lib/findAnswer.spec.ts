import { findAnswer, AnswerType } from './findAnswer';

describe('Find answers', () => {
  it('should return answers and no remaining bytes when correct data', () => {
    const data = ['%', 'R', 'S', '#', '1', '2', '$', '1', '2', '4', '\r'];
    data.push(...['%', 'R', 'M', '#', '2', '5', '$', '1', '0', '0', '\r']);

    const result = findAnswer(data);

    expect(result).toEqual({
      answers: [
        {
          type: AnswerType.READ_SETTING,
          id: '12',
          value: '124',
          raw: '%RS#12$124\r'
        },
        {
          type: AnswerType.READ_MEASUREMENT,
          id: '25',
          value: '100',
          raw: '%RM#25$100\r'
        }
      ],
      remaining: []
    });
  });
});
