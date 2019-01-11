import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadSystemInfosHandler from './createReadSystemInfosHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadSystemInfosHandler
];
