import { EventEmitter } from 'events';

export enum FrameType {
  READ_MEASUREMENT,
  READ_SYSTEM_INFO,
  READ_STATE,
  WRITE_SETTING,
  READ_SETTING,
  EXECUTE_COMMAND
}

export interface Frame {
  type: FrameType;
  raw: string[];
}

export class FrameFinder extends EventEmitter {
  public load(data: string[]): void {
    this.emit('frame', { type: FrameType.READ_MEASUREMENT, raw: data });
  }
}

export function createFrameFinder(): FrameFinder {
  return new FrameFinder();
}
