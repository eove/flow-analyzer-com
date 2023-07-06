import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import { makeGetDeviceType } from './makeGetDeviceType';

export default function createReadSerialNumberHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { debug } = dependencies;

  const getDeviceType = makeGetDeviceType(dependencies);

  return {
    type: 'READ_DEVICE_TYPE',
    handle: async ({ type }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      return await getDeviceType();
    },
  };
}
