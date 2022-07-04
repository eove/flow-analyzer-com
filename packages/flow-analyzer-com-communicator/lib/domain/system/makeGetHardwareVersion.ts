import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetHardwareVersion(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return function getHardwareVersion(): Promise<string> {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: 1,
    });
    return runCommand(command).then((answer) => `${answer.value}`);
  };
}
