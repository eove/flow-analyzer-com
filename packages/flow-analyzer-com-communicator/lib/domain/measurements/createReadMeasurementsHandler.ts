import { FrameType } from '../../protocol';
import { DeviceType } from '../DeviceType';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import getMeasurementInfos from './getMeasurementInfos';
import makeFormatMeasurementAnswer from './makeFormatMeasurementAnswer';

export default function createReadMeasurementsHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_MEASUREMENTS',
    handle: ({
      type,
      payload,
      deviceType = DeviceType.CITREX_H4,
    }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      const { names } = payload;

      return Promise.all(names.map((name: string) => createReadPromise(name)));

      function createReadPromise(name: string) {
        const { divider, unit, id } = getMeasurementInfos(name, deviceType);
        const format = makeFormatMeasurementAnswer({ name, id, divider, unit });
        const command = buildCommand({
          type: FrameType.READ_MEASUREMENT,
          id,
        });

        return runCommand(command).then((answer) => format(answer));
      }
    },
  };
}
