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

  function getHardwareVersion(): Promise<string | undefined | null> {
    const command = buildCommand(
      {
        type: FrameType.READ_SYSTEM_INFO,
        id: '1'
      },
      { answerTimeout: 10000 }
    );
    return runCommand(command).then(answer => answer.value);
  }

  function getSerialNumber(): Promise<string | undefined | null> {
    const command = buildCommand(
      {
        type: FrameType.READ_SYSTEM_INFO,
        id: '8'
      },
      { answerTimeout: 10000 }
    );
    return runCommand(command).then(answer => answer.value);
  }

  function getSoftwareVersion(): Promise<string | undefined | null> {
    return Promise.all([
      getMajorVersion(),
      getMinorVersion(),
      getRelease()
    ]).then((results: any) => {
      const [major, minor, release] = results;
      return `${major}.${minor}.${release}`;
    });

    function getMajorVersion(): Promise<string | undefined | null> {
      const command = buildCommand(
        {
          type: FrameType.READ_SYSTEM_INFO,
          id: '2'
        },
        { answerTimeout: 10000 }
      );
      return runCommand(command).then(answer => answer.value);
    }

    function getMinorVersion(): Promise<string | undefined | null> {
      const command = buildCommand(
        {
          type: FrameType.READ_SYSTEM_INFO,
          id: '3'
        },
        { answerTimeout: 10000 }
      );
      return runCommand(command).then(answer => answer.value);
    }

    function getRelease(): Promise<string | undefined | null> {
      const command = buildCommand(
        {
          type: FrameType.READ_SYSTEM_INFO,
          id: '4'
        },
        { answerTimeout: 10000 }
      );
      return runCommand(command).then(answer => answer.value);
    }
  }
}
