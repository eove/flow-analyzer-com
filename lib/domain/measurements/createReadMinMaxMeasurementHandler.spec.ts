import { stub } from 'sinon';
import createReadMinMaxMeasurementHandler from './createReadMinMaxMeasurementHandler';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

describe('Read measurement handler', () => {
  let handler: DomainCommandHandler;

  beforeEach(() => {
    const runCommand = stub();
    runCommand.onCall(0).resolves({
      id: 3,
      type: 'RM',
      value: 100,
      raw: 'RRRRRRR'
    });
    runCommand.onCall(1).resolves({
      id: 3,
      type: 'RM',
      value: -10,
      raw: 'RRRRRRR'
    });
    const buildCommand = stub().returns({});
    const debug = () => {};

    handler = createReadMinMaxMeasurementHandler({
      runCommand,
      buildCommand,
      debug
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should resolve a formatted min max measurement', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'o2', durationMS: 50, samplesNb: 2 }
    });

    expect(result).toEqual({
      id: 9,
      name: 'o2',
      unit: '%',
      max: 10,
      min: -1
    });
  });

  // it('should throw an error if unknown measurement', () => {
  //   return expect(() => {
  //     handler.handle({
  //       type: 'A_TYPE',
  //       payload: { name: 'unknown' }
  //     });
  //   }).toThrow('Invalid unknown measurement');
  // });
});
