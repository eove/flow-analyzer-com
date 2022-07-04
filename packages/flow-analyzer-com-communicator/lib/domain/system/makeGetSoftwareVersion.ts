import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetSoftwareVersion(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return async function getSoftwareVersion(): Promise<string> {
    const major = await getMajorVersion();
    const minor = await getMinorVersion();
    const release = await getRelease();
    return `${major}.${minor}.${release}`;

    function getMajorVersion(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 2,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getMinorVersion(): Promise<string> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 3,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getRelease(): Promise<string> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 4,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }
  };
}
