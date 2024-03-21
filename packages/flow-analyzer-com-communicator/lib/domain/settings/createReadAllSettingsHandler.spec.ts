import { stub } from 'sinon';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import createReadAllSettingsHandler from './createReadAllSettingsHandler';

describe('Read all settings handler', () => {
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

    handler = createReadAllSettingsHandler({
      runCommand,
      buildCommand,
      debug,
    } as DomainCommandHandlerFactoryDependencies);
  });

  it('should return formatted settings', async () => {
    const settings = await handler.handle({
      type: 'A_TYPE',
    });

    expect((settings as { name: string }[]).map((s) => s.name)).toEqual([
      'gazType',
      'manualOxygenConcentration',
      'gazStandards',
      'respMode',
      'triggerSource',
      'startTriggerSignal',
      'startTriggerEdge',
      'startTriggerSignalValue',
      'endTriggerSignal',
      'endTriggerEdge',
      'endTriggerSignalValue',
      'triggerDelay',
      'baseFlowEnabled',
      'baseFlowValue',
      'filterType',
    ]);
  });
});
