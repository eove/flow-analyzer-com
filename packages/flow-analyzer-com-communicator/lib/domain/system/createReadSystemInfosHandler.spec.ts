import { SinonStub, stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import createReadSystemInfosHandler from './createReadSystemInfosHandler';

describe('Read system infos handler', () => {
  let handler: DomainCommandHandler;
  let runCommand: SinonStub;

  beforeEach(() => {
    runCommand = stub();
    runCommand.onCall(0).resolves({
      value: 6,
    });
    runCommand.onCall(1).resolves({
      value: 2,
    });
    runCommand.onCall(2).resolves({
      value: 3,
    });
    runCommand.onCall(3).resolves({
      value: '001',
    });
    runCommand.onCall(4).resolves({
      value: 1,
    });
    runCommand.onCall(5).resolves({
      value: 5,
    });
    runCommand.onCall(6).resolves({
      value: 8,
    });
    runCommand.onCall(7).resolves({
      value: '898',
    });
    runCommand.onCall(8).resolves({
      value: '26',
    });
    runCommand.onCall(9).resolves({
      value: '12',
    });
    runCommand.onCall(10).resolves({
      value: '23',
    });
    runCommand.onCall(11).resolves({
      value: '26',
    });
    runCommand.onCall(12).resolves({
      value: '12',
    });
    runCommand.onCall(13).resolves({
      value: '24',
    });
    runCommand.onCall(14).resolves({
      value: '2',
    });

    const buildCommand = stub().returns({ id: 3, value: 1, raw: 'RRRRRRR' });
    const debug = (msg: any) => msg;

    handler = createReadSystemInfosHandler({
      runCommand,
      buildCommand,
      debug,
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should run many commands before returning', async () => {
    const result = await handler.handle({
      type: 'A_TYPE',
      payload: {
        deviceType: true,
        hardwareVersion: true,
        softwareVersion: true,
        fgpaVersion: true,
        serialNumber: true,
        lastCalibrationDate: true,
        nextCalibrationDate: true,
      },
    });

    expect(runCommand.callCount).toEqual(15);
    expect(result).toEqual({
      hardwareVersion: '6',
      serialNumber: '898',
      softwareVersion: '2.3.001',
      fpgaVersion: '1.5.8',
      deviceType: 'vt305',
      lastCalibrationDate: '23-12-26',
      nextCalibrationDate: '24-12-26',
    });
  });
});
