import { FrameType } from '../../protocol';
import { DeviceType } from '../DeviceType';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import getSettingInfos from './getSettingInfos';
import makeFormatSettingAnswer from './makeFormatSettingAnswer';

export default function createReadSettingHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_SETTING',
    handle: ({
      type,
      payload,
      deviceType = DeviceType.PF300,
    }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { name } = payload;
      const { unit, id, valueToName } = getSettingInfos(name, deviceType);
      const format = makeFormatSettingAnswer({ name, unit, id, valueToName });

      const command = buildCommand({
        type: FrameType.READ_SETTING,
        id,
      });

      return runCommand(command).then((answer) => format(answer));
    },
  };
}
