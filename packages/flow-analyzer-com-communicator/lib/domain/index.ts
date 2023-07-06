export * from './DeviceType';
export * from './DomainTypes';

import { factories as executeFactories } from './execute';
import { factories as measurementFactories } from './measurements';
import { factories as settingsFactories } from './settings';
import { factories as systemFactories } from './system';

export const commandHandlerFactories = {
  measurements: measurementFactories,
  settings: settingsFactories,
  system: systemFactories,
  execute: executeFactories,
};
