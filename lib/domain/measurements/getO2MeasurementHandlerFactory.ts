import { FrameType } from '../../protocol';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

export function createGetO2MeasurementHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand } = dependencies;
  return {
    type: 'GET_O2_MEASUREMENT',
    handle: () => {
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id: '9'
      });
      return runCommand(command).then(answer => ({ payload: answer.value }));
    }
  };
}
