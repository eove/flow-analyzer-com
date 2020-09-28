import { DomainCommandHandlerFactory } from '../DomainTypes';
import createSetRs232EchoHandler from './createSetRs232EchoHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createSetRs232EchoHandler
];
