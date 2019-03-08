import { FrameType } from '../../protocol';
import makeFormatSettingAnswer from './makeFormatSettingAnswer';

describe('Format setting answser', () => {
  const valueToName: any = (v: any) => `${v}`;

  it('should format value without unit', () => {
    const format = makeFormatSettingAnswer({ name: 'o2', id: 8, valueToName });

    expect(
      format({
        value: 100,
        type: FrameType.READ_MEASUREMENT,
        id: 8,
        raw: 'RRRRRRR'
      })
    ).toEqual({
      valueAsString: '100',
      id: 8,
      name: 'o2',
      value: 100
    });
  });

  it('should format value with unit', () => {
    const format = makeFormatSettingAnswer({
      name: 'o2',
      id: 8,
      valueToName,
      unit: '%'
    });

    expect(
      format({
        value: 100,
        type: FrameType.READ_MEASUREMENT,
        id: 8,
        raw: 'RRRRRRR'
      })
    ).toEqual({
      valueAsString: '100 %',
      id: 8,
      name: 'o2',
      value: 100,
      unit: '%'
    });
  });

  it('should format null value', () => {
    const format = makeFormatSettingAnswer({
      name: 'o2',
      id: 8,
      valueToName,
      unit: '%'
    });

    expect(
      format({
        value: null,
        type: FrameType.READ_MEASUREMENT,
        id: 8,
        raw: 'RRRRRRR'
      })
    ).toEqual({
      valueAsString: '-',
      id: 8,
      name: 'o2',
      value: null,
      unit: '%'
    });
  });
});
