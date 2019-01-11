import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadMeasurementHandler from './createReadMeasurementHandler';
import createReadMinMaxMeasurementHandler from './createReadMinMaxMeasurementHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadMeasurementHandler,
  createReadMinMaxMeasurementHandler
];
