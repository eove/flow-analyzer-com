import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';
import getMeasurementInfos from './getMeasurementInfos';
import makeFormatMeasurementAnswer from './makeFormatMeasurementAnswer';

export function createReadMeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_MEASUREMENT',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { name } = payload;
      const format = makeFormatMeasurementAnswer(name);
      const command = buildCommand(
        {
          type: FrameType.READ_MEASUREMENT,
          id: getMeasurementInfos(name).id
        },
        { answerTimeout: 10000 }
      );

      return runCommand(command).then(answer => format(answer));
    }
  };
}
