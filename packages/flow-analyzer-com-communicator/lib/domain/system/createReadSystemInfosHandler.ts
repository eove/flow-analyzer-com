import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import { makeGetHardwareVersion } from './makeGetHardwareVersion';
import { makeGetSerialNumber } from './makeGetSerialNumber';
import { makeGetSoftwareVersion } from './makeGetSoftwareVersion';

export default function createReadSystemInfosHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { debug } = dependencies;

  const getSerialNumber = makeGetSerialNumber(dependencies);
  const getHardwareVersion = makeGetHardwareVersion(dependencies);
  const getSoftwareVersion = makeGetSoftwareVersion(dependencies);

  return {
    type: 'READ_SYSTEM_INFOS',
    handle: async ({ type }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const hardwareVersion = await getHardwareVersion();
      const softwareVersion = await getSoftwareVersion();
      const serialNumber = await getSerialNumber();
      return { hardwareVersion, softwareVersion, serialNumber };
    },
  };
}
