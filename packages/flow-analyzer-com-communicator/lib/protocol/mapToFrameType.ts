import { FrameType } from './types';

export default function mapToFrameType(data: string): FrameType {
  switch (data) {
    case 'RS':
      return FrameType.READ_SETTING;
    case 'WS':
      return FrameType.WRITE_SETTING;
    case 'RM':
      return FrameType.READ_MEASUREMENT;
    case 'RI':
      return FrameType.READ_SYSTEM_INFO;
    case 'ST':
      return FrameType.READ_STATE;
    case 'CM':
      return FrameType.EXECUTE_COMMAND;
    default:
      return FrameType.UNKOWN;
  }
}
