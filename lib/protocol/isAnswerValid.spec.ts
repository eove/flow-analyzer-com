import { isAnswerValid } from './isAnswerValid';
import { FrameType } from './types';

describe('Answer validity', () => {
  it('should return true when valid frame', () => {
    expect(
      isAnswerValid({ type: FrameType.READ_MEASUREMENT, raw: 'blabla' })
    ).toEqual(true);
  });

  it('should return false when invalid frame', () => {
    expect(isAnswerValid({ type: FrameType.INVALID, raw: 'blabla' })).toEqual(
      false
    );
  });
});
