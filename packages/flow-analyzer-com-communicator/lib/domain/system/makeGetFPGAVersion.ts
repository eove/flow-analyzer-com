import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetFPGAVersion(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return async function getFPGAVersion(): Promise<string | undefined> {
    try {
      const major = await getMajorVersion();
      const minor = await getMinorVersion();
      const release = await getRelease();
      return `${major}.${minor}.${release}`;
    } catch (error) {
      return undefined;
    }

    function getMajorVersion(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 13,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getMinorVersion(): Promise<string> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 14,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getRelease(): Promise<string> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 15,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }
  };
}
