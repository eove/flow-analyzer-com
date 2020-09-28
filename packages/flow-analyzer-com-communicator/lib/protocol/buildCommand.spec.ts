import { buildCommand } from './buildCommand';
import { FrameType } from './types';

describe('Building commands', () => {
  it('should build an "execute" command', () => {
    const command = buildCommand({
      type: FrameType.EXECUTE_COMMAND,
      id: 123,
      value: '4567'
    });

    expect(command).toEqual({
      type: FrameType.EXECUTE_COMMAND,
      id: 123,
      value: '4567',
      raw: '%CM#123$4567\r',
      answerTimeout: 5000
    });
  });

  it('should build a "write setting" command', () => {
    const command = buildCommand({
      type: FrameType.WRITE_SETTING,
      id: 123,
      value: '4567'
    });

    expect(command).toEqual({
      type: FrameType.WRITE_SETTING,
      id: 123,
      value: '4567',
      raw: '%WS#123$4567\r',
      answerTimeout: 5000
    });
  });

  it('should build a "read setting" command', () => {
    const command = buildCommand({
      type: FrameType.READ_SETTING,
      id: 123
    });

    expect(command).toEqual({
      type: FrameType.READ_SETTING,
      id: 123,
      raw: '%RS#123\r',
      answerTimeout: 5000
    });
  });

  it('should build a "read measurement" command', () => {
    const command = buildCommand({
      type: FrameType.READ_MEASUREMENT,
      id: 123
    });

    expect(command).toEqual({
      type: FrameType.READ_MEASUREMENT,
      id: 123,
      raw: '%RM#123\r',
      answerTimeout: 5000
    });
  });

  it('should build a "read system info" command', () => {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: 123
    });

    expect(command).toEqual({
      type: FrameType.READ_SYSTEM_INFO,
      id: 123,
      raw: '%RI#123\r',
      answerTimeout: 5000
    });
  });

  it('should build a "read state" command', () => {
    const command = buildCommand({
      type: FrameType.READ_STATE,
      id: 123
    });

    expect(command).toEqual({
      type: FrameType.READ_STATE,
      id: 123,
      raw: '%ST#123\r',
      answerTimeout: 5000
    });
  });

  it('should take options such as answer timeout', () => {
    const command = buildCommand(
      {
        type: FrameType.READ_STATE,
        id: 123
      },
      { answerTimeout: 5678 }
    );

    expect(command).toEqual({
      type: FrameType.READ_STATE,
      id: 123,
      raw: '%ST#123\r',
      answerTimeout: 5678
    });
  });
});
