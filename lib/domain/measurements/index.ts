import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createGetO2Handler } from './getO2HandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [createGetO2Handler];
