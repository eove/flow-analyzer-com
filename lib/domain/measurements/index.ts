import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createReadMeasurementHandler } from './readMeasurementHandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [
  createReadMeasurementHandler
];
