import { spy } from 'sinon';
import { createFrameFinder, FrameFinder, FrameType } from './FrameFinder';

describe('FrameFinder', () => {
  let frameFinder: FrameFinder;

  beforeEach(() => {
    frameFinder = createFrameFinder();
  });

  it('should emit frame when loading correct data', () => {
    const frameReceived = spy();
    frameFinder.on('frame', frameReceived);

    frameFinder.load(['%', 'R', 'S', '#', '12', '$', '124', '\r']);

    expect(frameReceived.called).toBe(true);
    expect(frameReceived.getCall(0).args[0]).toEqual({
      type: FrameType.READ_MEASUREMENT,
      raw: ['%', 'R', 'S', '#', '12', '$', '124', '\r']
    });
  });
});
