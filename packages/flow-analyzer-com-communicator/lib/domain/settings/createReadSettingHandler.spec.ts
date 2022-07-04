import { stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import createReadSettingHandler from './createReadSettingHandler';

describe('Read setting handler', () => {
  let handler: DomainCommandHandler;

  beforeEach(() => {
    const runCommand = stub().resolves({
      id: 3,
      type: 'RS',
      value: 1,
      raw: 'RRRRRRR',
    });
    const buildCommand = stub().returns({});
    const debug = (msg: any) => msg;

    handler = createReadSettingHandler({
      deviceType: 'h4',
      runCommand,
      buildCommand,
      debug,
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should return a formatted setting', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'gazType' },
    });

    expect(result).toEqual({
      valueAsString: 'Air/O2-man.',
      id: 3,
      name: 'gazType',
      value: 1,
    });
  });

  it('should throw an error if unknown setting', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'unknown' },
      });
    }).toThrow('Invalid unknown setting');
  });
});
