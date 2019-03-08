import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadMeasurementHandler from './createReadMeasurementHandler';
import createReadMeasurementsHandler from './createReadMeasurementsHandler';
import createReadMinMaxMeasurementHandler from './createReadMinMaxMeasurementHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadMeasurementHandler,
  createReadMeasurementsHandler,
  createReadMinMaxMeasurementHandler
];
