import { stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import createReadMeasurementsHandler from './createReadMeasurementsHandler';

describe('Read measurements handler', () => {
  let handler: DomainCommandHandler;

  beforeEach(() => {
    const runCommand = stub().resolves({
      id: 3,
      type: 'RM',
      value: 100,
      raw: 'RRRRRRR',
    });
    const buildCommand = stub().returns({});
    const debug = (msg: any) => msg;

    handler = createReadMeasurementsHandler({
      runCommand,
      buildCommand,
      debug,
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should return formatted measurements', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { names: ['o2', 'peep'] },
    });

    expect(result).toEqual([
      {
        valueAsString: '10',
        id: 9,
        name: 'o2',
        unit: '%',
        value: 10,
      },
      { valueAsString: '10', id: 29, name: 'peep', unit: 'mbar', value: 10 },
    ]);
  });

  it('should throw an error if unknown measurement', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { names: ['o2', 'unknown'] },
      });
    }).toThrow('Invalid unknown measurement');
  });
});
