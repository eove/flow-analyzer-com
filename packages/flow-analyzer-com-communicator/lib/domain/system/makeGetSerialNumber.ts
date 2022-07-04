import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetSerialNumber(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return function getSerialNumber(): Promise<string> {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: 8,
    });
    return runCommand(command).then((answer) => `${answer.value}`);
  };
}
