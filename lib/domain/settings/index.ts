import { DomainCommandHandlerFatory } from '../DomainTypes';
import createReadSettingHandler from './createReadSettingHandler';
import createWriteSettingHandler from './createWriteSettingHandler';

export const factories: DomainCommandHandlerFatory[] = [
  createReadSettingHandler,
  createWriteSettingHandler
];
