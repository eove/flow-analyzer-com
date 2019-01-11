import { SinonStub, stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import createWriteSettingHandler from './createWriteSettingHandler';

describe('Write setting handler', () => {
  let handler: DomainCommandHandler;
  let runCommand: SinonStub;

  beforeEach(() => {
    runCommand = stub();
    runCommand.resolves({
      id: 3,
      type: 'WS',
      value: 1,
      raw: 'RRRRRRR'
    });
    const buildCommand = stub().returns({ id: 3, value: 1, raw: 'RRRRRRR' });
    const debug = (msg: any) => msg;

    handler = createWriteSettingHandler({
      runCommand,
      buildCommand,
      debug
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should return answer when value is a number', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'gazType', value: 1 }
    });

    expect(result).toEqual({ id: 3, raw: 'RRRRRRR', type: 'WS', value: 1 });
  });

  it('should return answer when value is a string', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'gazType', value: 'Air/O2-man.' }
    });

    expect(result).toEqual({ id: 3, raw: 'RRRRRRR', type: 'WS', value: 1 });
  });

  it('should reject if returned value is not the written one', () => {
    runCommand.resolves({ id: 3, value: 3, raw: 'ZZZZ' });
    return expect(
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'gazType', value: 1 }
      })
    ).rejects.toThrow('Failed to write value: 1 to id: gazType');
  });

  it('should throw an error if unsupported setting value', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'gazType', value: 'unsupported' }
      });
    }).toThrow(`'unsupported' is not a valid value`);
  });

  it('should throw an error if unknown setting name', () => {
    return expect(() => {
      handler.handle({
        type: 'A_TYPE',
        payload: { name: 'unknown', value: 1 }
      });
    }).toThrow('Invalid unknown setting');
  });
});
