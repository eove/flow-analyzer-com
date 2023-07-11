import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import { makeGetSerialNumber } from './makeGetSerialNumber';

export default function createReadSerialNumberHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { debug } = dependencies;

  const getSerialNumber = makeGetSerialNumber(dependencies);

  return {
    type: 'READ_SERIAL_NUMBER',
    handle: async ({ type }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      return getSerialNumber();
    },
  };
}
