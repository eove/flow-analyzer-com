export enum FrameType {
  READ_MEASUREMENT = 'READ MEASUREMENT',
  READ_SYSTEM_INFO = 'READ SYSTEM INFO',
  READ_STATE = 'READ STATE',
  WRITE_SETTING = 'WRITE SETTING',
  READ_SETTING = 'READ SETTING',
  EXECUTE_COMMAND = 'EXECUTE COMMAND',
  INVALID = 'INVALID',
  UNKOWN = 'UNKNOWN'
}

export function mapToFrameType(data: string): FrameType {
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

export function mapFromFrameType(type: FrameType): string {
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
