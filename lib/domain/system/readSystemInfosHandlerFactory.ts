import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

export function createReadSystemInfosHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'READ_SYSTEM_INFOS',
    handle: ({ type }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      return Promise.all([
        getHardwareVersion(),
        getSoftwareVersion(),
        getSerialNumber()
      ]).then((results: any) => {
        const [hardwareVersion, softwareVersion, serialNumber] = results;
        return { hardwareVersion, softwareVersion, serialNumber };
      });
    }
  };

  function getHardwareVersion(): Promise<any> {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: '1'
    });
    return runCommand(command).then(answer => answer.value);
  }

  function getSerialNumber(): Promise<any> {
    const command = buildCommand({
      type: FrameType.READ_SYSTEM_INFO,
      id: '8'
    });
    return runCommand(command).then(answer => answer.value);
  }

  function getSoftwareVersion(): Promise<any> {
    return Promise.all([
      getMajorVersion(),
      getMinorVersion(),
      getRelease()
    ]).then((results: any) => {
      const [major, minor, release] = results;
      return `${major}.${minor}.${release}`;
    });

    function getMajorVersion(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: '2'
      });
      return runCommand(command).then(answer => answer.value);
    }

    function getMinorVersion(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: '3'
      });
      return runCommand(command).then(answer => answer.value);
    }

    function getRelease(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: '4'
      });
      return runCommand(command).then(answer => answer.value);
    }
  }
}
