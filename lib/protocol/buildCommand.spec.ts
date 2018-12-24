import { buildCommand } from './buildCommand';
import { FrameType } from './FrameType';

describe('Build command', () => {
  it('should build an execute command', () => {
    const command = buildCommand({
      type: FrameType.EXECUTE_COMMAND,
      id: '123',
      value: '4567'
    });

    expect(command).toEqual({
      type: FrameType.EXECUTE_COMMAND,
      id: '123',
      value: '4567',
      raw: '%CM#123$4567\r'
    });
  });

  it('should build a write setting command', () => {
    const command = buildCommand({
      type: FrameType.WRITE_SETTING,
      id: '123',
      value: '4567'
    });

    expect(command).toEqual({
      type: FrameType.WRITE_SETTING,
      id: '123',
      value: '4567',
      raw: '%WS#123$4567\r'
    });
  });

  it('should build a read setting command', () => {
    const command = buildCommand({
      type: FrameType.READ_SETTING,
      id: '123'
    });

    expect(command).toEqual({
      type: FrameType.READ_SETTING,
      id: '123',
      raw: '%RS#123\r'
    });
  });

  it('should build a read measurement command', () => {
    const command = buildCommand({
      type: FrameType.READ_MEASUREMENT,
      id: '123'
    });

    expect(command).toEqual({
      type: FrameType.READ_MEASUREMENT,
      id: '123',
      raw: '%RM#123\r'
    });
  });

  it('should build a read system info', () => {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: '123'
    });

    expect(command).toEqual({
      type: FrameType.READ_SYSTEM_INFO,
      id: '123',
      raw: '%RI#123\r'
    });
  });

  it('should build a read state', () => {
    const command = buildCommand({
      type: FrameType.READ_STATE,
      id: '123'
    });

    expect(command).toEqual({
      type: FrameType.READ_STATE,
      id: '123',
      raw: '%ST#123\r'
    });
  });
});
