import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createO2Handler } from './getO2HandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [createO2Handler];
