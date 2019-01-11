import { SinonStub, stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import createReadSystemInfosHandler from './createReadSystemInfosHandler';

describe('Read system infos handler', () => {
  let handler: DomainCommandHandler;
  let runCommand: SinonStub;

  beforeEach(() => {
    runCommand = stub();
    runCommand.onCall(0).resolves({
      value: 6
    });
    runCommand.onCall(1).resolves({
      value: 2
    });
    runCommand.onCall(2).resolves({
      value: 3
    });
    runCommand.onCall(3).resolves({
      value: '001'
    });
    runCommand.onCall(4).resolves({
      value: '898'
    });

    const buildCommand = stub().returns({ id: 3, value: 1, raw: 'RRRRRRR' });
    const debug = (msg: any) => msg;

    handler = createReadSystemInfosHandler({
      runCommand,
      buildCommand,
      debug
    } as DomainCommandHandlerFactoryDependencies);
  });

  it.only('should run many commands before returning', async () => {
    const result = await handler.handle({
      type: 'A_TYPE'
    });

    expect(runCommand.callCount).toEqual(5);
    expect(result).toEqual({
      hardwareVersion: '6',
      serialNumber: '898',
      softwareVersion: '2.3.001'
    });
  });
});
