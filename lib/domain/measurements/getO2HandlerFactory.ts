import { FrameType } from '../../protocol';
import {
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

export function createGetO2Handler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand } = dependencies;
  return {
    type: 'GET_O2_HANDLER',
    handle: () => {
      const command = buildCommand({
        type: FrameType.READ_MEASUREMENT,
        id: '2'
      });
      return runCommand(command).then(answer => ({ payload: answer.value }));
    }
  };
}
