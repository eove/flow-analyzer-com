import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createReadSettingHandler } from './readSettingHandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [
  createReadSettingHandler
];
