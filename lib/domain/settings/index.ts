import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadSettingHandler from './createReadSettingHandler';
import createWriteSettingHandler from './createWriteSettingHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadSettingHandler,
  createWriteSettingHandler
];
