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

export interface ProtocolAnswer {
  type: FrameType;
  id?: string;
  value?: string | null;
  raw: string;
}
