import { stub } from 'sinon';
import { DeviceTypes } from '../DeviceTypes';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import createReadMinMaxMeasurementHandler from './createReadMinMaxMeasurementHandler';

describe('Read min/max measurement handler', () => {
  let handler: DomainCommandHandler;

  beforeEach(() => {
    const runCommand = stub();
    runCommand.onCall(0).resolves({
      id: 3,
      type: 'RM',
      value: 100,
      raw: 'RRRRRRR',
    });
    runCommand.onCall(1).resolves({
      id: 3,
      type: 'RM',
      value: -10,
      raw: 'RRRRRRR',
    });
    const buildCommand = stub().returns({});
    const debug = (msg: any) => msg;

    handler = createReadMinMaxMeasurementHandler({
      deviceType: DeviceTypes.CITREX_H4,
      runCommand,
      buildCommand,
      debug,
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should return a formatted min max measurement', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'o2', durationMS: 50, samplesNb: 2 },
    });

    expect(result).toEqual({
      id: 9,
      name: 'o2',
      unit: '%',
      max: 10,
      min: -1,
      values: [
        {
          name: 'o2',
          id: 9,
          unit: '%',
          value: 10,
          valueAsString: '10',
        },
        {
          name: 'o2',
          id: 9,
          unit: '%',
          value: -1,
          valueAsString: '-1',
        },
      ],
    });
  });

  it('should throw an error if sample rate it too high', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'o2', durationMS: 50, samplesNb: 20 },
      });
    }).toThrow(
      'samplesNb (20) and durationMS (50) result in a sampleDelayMS (2.5) < 20 ms'
    );
  });
});
