import { stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import createReadMeasurementHandler from './createReadMeasurementHandler';

describe('Read measurement handler', () => {
  let handler: DomainCommandHandler;

  beforeEach(() => {
    const runCommand = stub().resolves({
      id: 3,
      type: 'RM',
      value: 100,
      raw: 'RRRRRRR'
    });
    const buildCommand = stub().returns({});
    const debug = (msg: any) => msg;

    handler = createReadMeasurementHandler({
      runCommand,
      buildCommand,
      debug
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should resolve a formatted measurement', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'o2' }
    });

    expect(result).toEqual({
      displayValue: '10 %',
      id: 9,
      name: 'o2',
      unit: '%',
      value: 10
    });
  });

  it('should throw an error if unknown measurement', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'unknown' }
      });
    }).toThrow('Invalid unknown measurement');
  });
});
