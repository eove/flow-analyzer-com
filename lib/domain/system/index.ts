import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createReadSystemInfosHandler } from './readSystemInfosHandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [
  createReadSystemInfosHandler
];
