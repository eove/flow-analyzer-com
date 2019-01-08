export * from './DomainTypes';
import { factories as measurementFactories } from './measurements';
import { factories as settingsFactories } from './settings';
import { factories as systemInfosFactories } from './system';

export const commandHandlerFactories = {
  measurements: measurementFactories,
  settings: settingsFactories,
  system: systemInfosFactories
};
