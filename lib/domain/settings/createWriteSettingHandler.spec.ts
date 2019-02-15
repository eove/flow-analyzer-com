import { SinonStub, stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import createWriteSettingHandler from './createWriteSettingHandler';

describe('Write setting handler', () => {
  let handler: DomainCommandHandler;
  let runCommand: SinonStub;
  let buildCommand: SinonStub;

  beforeEach(() => {
    runCommand = stub();
    runCommand.resolves({
      id: 3,
      type: 'WS',
      value: 1,
      raw: 'RRRRRRR'
    });
    buildCommand = stub();
    buildCommand.returns({ id: 3, value: 1, raw: 'RRRRRRR' });
    const debug = (msg: any) => msg;

    handler = createWriteSettingHandler({
      runCommand,
      buildCommand,
      debug
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should build command when value is a positive number', async () => {
    await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'startTriggerSignalValue', value: 60 }
    });
    expect(buildCommand.called).toEqual(true);
    expect(buildCommand.getCall(0).args[0]).toEqual({
      id: 8,
      type: 'WRITE SETTING',
      value: '60'
    });
  });

  it('should build command when value is a negative number', async () => {
    await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'startTriggerSignalValue', value: -60 }
    });
    expect(buildCommand.called).toEqual(true);
    expect(buildCommand.getCall(0).args[0]).toEqual({
      id: 8,
      type: 'WRITE SETTING',
      value: '-60'
    });
  });

  it('should build command when value is a string', async () => {
    await handler.handle({
      type: 'A_TYPE',
      payload: { name: 'gazType', value: 'Air/O2-man.' }
    });

    expect(buildCommand.called).toEqual(true);
    expect(buildCommand.getCall(0).args[0]).toEqual({
      id: 1,
      type: 'WRITE SETTING',
      value: '1'
    });
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
