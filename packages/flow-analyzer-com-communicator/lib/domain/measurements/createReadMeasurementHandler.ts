import { FrameType } from '../../protocol';
import { DeviceTypes } from '../DeviceTypes';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import getMeasurementInfos from './getMeasurementInfos';
import makeFormatMeasurementAnswer from './makeFormatMeasurementAnswer';

export default function createReadMeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_MEASUREMENT',
    handle: ({
      type,
      deviceType = DeviceTypes.PF300,
      payload,
    }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { name } = payload;
      const { divider, unit, id } = getMeasurementInfos(name, deviceType);
      const format = makeFormatMeasurementAnswer({ name, id, divider, unit });
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id,
      });

      return runCommand(command).then((answer) => format(answer));
    },
  };
}
