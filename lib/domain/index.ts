export * from './DomainTypes';
import { factories as measurementFactories } from './measurements';

export const commandHandlerFactories = {
  measurements: measurementFactories
};
