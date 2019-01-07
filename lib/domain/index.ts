export * from './DomainTypes';
import { factories as measurementFactories } from './measurements';
import { factories as settingsFactories } from './settings';

export const commandHandlerFactories = {
  measurements: measurementFactories,
  settings: settingsFactories
};
