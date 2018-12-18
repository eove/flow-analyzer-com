import { FrameType } from './FrameType';
import { buildCommand } from './buildCommand';

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
      raw: ['%', 'C', 'M', '#', '1', '2', '3', '$', '4', '5', '6', '7', '\r']
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
      raw: ['%', 'W', 'S', '#', '1', '2', '3', '$', '4', '5', '6', '7', '\r']
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
      raw: ['%', 'R', 'S', '#', '1', '2', '3', '\r']
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
      raw: ['%', 'R', 'M', '#', '1', '2', '3', '\r']
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
      raw: ['%', 'R', 'I', '#', '1', '2', '3', '\r']
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
      raw: ['%', 'S', 'T', '#', '1', '2', '3', '\r']
    });
  });
});
