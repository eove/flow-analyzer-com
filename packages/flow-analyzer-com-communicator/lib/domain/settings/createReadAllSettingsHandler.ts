import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import getSettingInfos, { getAllSettingInfos } from './getSettingInfos';
import makeFormatSettingAnswer from './makeFormatSettingAnswer';

export default function createReadSettingHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug, deviceType } = dependencies;
  return {
    type: 'READ_ALL_SETTINGS',
    handle: ({ type }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      return Promise.all(
        getAllSettingInfos(deviceType).map(({ name }) => {
          const { unit, id, valueToName } = getSettingInfos(name, deviceType);
          const format = makeFormatSettingAnswer({
            name,
            unit,
            id,
            valueToName,
          });

          const command = buildCommand({
            type: FrameType.READ_SETTING,
            id,
          });
          return runCommand(command).then((answer) => format(answer));
        })
      );
    },
  };
}
