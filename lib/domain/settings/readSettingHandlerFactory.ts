import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import makeFormatSettingAnswer from './makeFormatSettingAnswer';
import getSettingInfos from './getSettingInfos';

export function createReadSettingHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_SETTING',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { name } = payload;
      const format = makeFormatSettingAnswer(name);
      const command = buildCommand(
        {
          type: FrameType.READ_SETTING,
          id: getSettingInfos(name).id
        },
        { answerTimeout: 10000 }
      );

      return runCommand(command).then(answer => format(answer));
    }
  };
}
