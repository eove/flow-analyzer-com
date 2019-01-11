import getSettingInfos from './getSettingInfos';

describe('Get setting infos', () => {
  it('should return setting infos for a given name', () => {
    expect(getSettingInfos('gazType')).toMatchObject({ id: 1 });
  });

  it('should throw an error when unkown name', () => {
    expect(() => getSettingInfos('unkown')).toThrow('Invalid unkown setting');
  });
});
