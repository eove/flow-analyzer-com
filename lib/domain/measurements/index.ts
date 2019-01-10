import { DomainCommandHandlerFatory } from '../DomainTypes';
import createReadMeasurementHandler from './createReadMeasurementHandler';
import createReadMinMaxMeasurementHandler from './createReadMinMaxMeasurementHandler';

export const factories: DomainCommandHandlerFatory[] = [
  createReadMeasurementHandler,
  createReadMinMaxMeasurementHandler
];
