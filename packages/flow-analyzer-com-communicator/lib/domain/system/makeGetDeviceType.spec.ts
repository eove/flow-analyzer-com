import { SinonStub, stub } from 'sinon';
import { DeviceType } from '../DeviceType';
import { makeGetDeviceType } from './makeGetDeviceType';

describe('Get device type', () => {
  let getDeviceType: () => Promise<string | undefined>;
  let runCommand: SinonStub;

  beforeEach(() => {
    runCommand = stub();
    runCommand.onCall(0).resolves({
      value: 6,
    });
    const buildCommand = stub().returns({ id: 3, value: 1, raw: 'RRRRRRR' });
    const debug = (msg: any) => msg;

    getDeviceType = makeGetDeviceType({
      runCommand,
      buildCommand,
      debug,
    });
  });

  describe.each([
    {
      returnedValueFromCommand: 1,
      expectedDecodedValue: DeviceType.CITREX_H4,
    },
    {
      returnedValueFromCommand: 2,
      expectedDecodedValue: DeviceType.VT305,
    },
    {
      returnedValueFromCommand: 3,
      expectedDecodedValue: DeviceType.CITREX_H5,
    },
    {
      returnedValueFromCommand: 4,
      expectedDecodedValue: DeviceType.CITREX_H3,
    },
    {
      returnedValueFromCommand: 5,
      expectedDecodedValue: DeviceType.PF300_PRO,
    },
    {
      returnedValueFromCommand: 6,
      expectedDecodedValue: DeviceType.FLOW_METER_F1,
    },
    {
      returnedValueFromCommand: 7,
      expectedDecodedValue: DeviceType.FLOW_METER_F2,
    },
  ])(
    'should return decoded device type',
    ({ returnedValueFromCommand, expectedDecodedValue }) => {
      it(`value: ${returnedValueFromCommand} => deviceType: ${expectedDecodedValue}`, async () => {
        runCommand.onCall(0).resolves({
          value: returnedValueFromCommand,
        });

        const deviceType = await getDeviceType();

        expect(deviceType).toEqual(expectedDecodedValue);
      });
    }
  );

  it('should return pf300 value on error', async () => {
    runCommand.onCall(0).rejects(new Error('bleh'));

    const deviceType = await getDeviceType();

    expect(deviceType).toEqual(DeviceType.PF300);
  });
});
