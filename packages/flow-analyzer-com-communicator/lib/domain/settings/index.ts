import { DomainCommandHandlerFactory } from '../DomainTypes';
import createReadAllSettingsHandler from './createReadAllSettingsHandler';
import createReadSettingHandler from './createReadSettingHandler';
import createWriteSettingHandler from './createWriteSettingHandler';

export const factories: DomainCommandHandlerFactory[] = [
  createReadSettingHandler,
  createReadAllSettingsHandler,
  createWriteSettingHandler
];
