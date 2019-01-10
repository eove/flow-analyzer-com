import { DomainCommandHandlerFatory } from '../DomainTypes';
import createSetRs232EchoHandler from './createSetRs232EchoHandler';

export const factories: DomainCommandHandlerFatory[] = [
  createSetRs232EchoHandler
];
