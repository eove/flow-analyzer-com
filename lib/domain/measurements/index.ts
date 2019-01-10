import { DomainCommandHandlerFatory } from '../DomainTypes';
import createReadMeasurementHandler from './createMeasurementHandler';

export const factories: DomainCommandHandlerFatory[] = [
  createReadMeasurementHandler
];
