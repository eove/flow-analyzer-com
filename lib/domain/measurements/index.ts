import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createGetO2MeasurementHandler } from './getO2MeasurementHandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [
  createGetO2MeasurementHandler
];
