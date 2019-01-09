import { DomainCommandHandlerFatory } from '../DomainTypes';
import { createReadSettingHandler } from './readSettingHandlerFactory';
import { createWriteSettingHandler } from './writeSettingHandlerFactory';

export const factories: DomainCommandHandlerFatory[] = [
  createReadSettingHandler,
  createWriteSettingHandler
];
