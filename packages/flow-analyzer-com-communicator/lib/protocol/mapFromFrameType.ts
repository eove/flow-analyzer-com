import { FrameType } from './types';

export default function mapFromFrameType(type: FrameType): string {
  switch (type) {
    case FrameType.READ_SETTING:
      return 'RS';
    case FrameType.WRITE_SETTING:
      return 'WS';
    case FrameType.READ_MEASUREMENT:
      return 'RM';
    case FrameType.READ_SYSTEM_INFO:
      return 'RI';
    case FrameType.READ_STATE:
      return 'ST';
    case FrameType.EXECUTE_COMMAND:
      return 'CM';
    default:
      throw new Error(`unknown type: ${type}`);
  }
}
