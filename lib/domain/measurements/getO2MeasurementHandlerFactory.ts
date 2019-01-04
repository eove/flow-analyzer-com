import { FrameType } from '../../protocol';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

export function createGetO2MeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'GET_O2_MEASUREMENT',
    handle: () => {
      debug(`running GET_O2_MEASUREMENT command handler...`);
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id: '9'
      });
      return runCommand(command).then(answer => ({
        rawValue: answer.value,
        value: Number(answer.value) / 10,
        unit: '%'
      }));
    }
  };
}
