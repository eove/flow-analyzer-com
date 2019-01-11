import { DomainCommandHandlerFactory } from '../DomainTypes';
import { createReadSystemInfosHandler } from './readSystemInfosHandlerFactory';

export const factories: DomainCommandHandlerFactory[] = [
  createReadSystemInfosHandler
];
