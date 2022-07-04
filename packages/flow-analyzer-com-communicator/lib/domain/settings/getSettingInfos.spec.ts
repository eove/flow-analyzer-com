import { DeviceTypes } from '../DeviceTypes';
import getSettingInfos from './getSettingInfos';

describe('Get setting infos', () => {
  it('should return setting infos for a given name', () => {
    expect(getSettingInfos('gazType', DeviceTypes.CITREX_H4)).toMatchObject({
      id: 1,
    });
  });

  it('should throw an error when unkown name', () => {
    expect(() => getSettingInfos('unkown', DeviceTypes.CITREX_H4)).toThrow(
      'Invalid unkown setting'
    );
  });

  it('should throw an error when unsupported for a given device type', () => {
    expect(() =>
      getSettingInfos('startTriggerDelay', DeviceTypes.PF300)
    ).toThrow('Invalid startTriggerDelay setting');
  });
});
