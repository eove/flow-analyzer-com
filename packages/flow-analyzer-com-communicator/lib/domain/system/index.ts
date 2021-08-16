import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadSerialNumberHandler from './createReadSerialNumberHandler';
import createReadSystemInfosHandler from './createReadSystemInfosHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadSystemInfosHandler,
  createReadSerialNumberHandler
];
