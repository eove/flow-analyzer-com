import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadDeviceTypeHandler from './createReadDeviceTypeHandler';
import createReadSerialNumberHandler from './createReadSerialNumberHandler';
import createReadSystemInfosHandler from './createReadSystemInfosHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadDeviceTypeHandler,
  createReadSystemInfosHandler,
  createReadSerialNumberHandler,
];
