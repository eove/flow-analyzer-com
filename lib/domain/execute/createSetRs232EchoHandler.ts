import { FrameType } from '../../protocol';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies
} from '../DomainTypes';

export default function createSetRs232EchoHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { runCommand, buildCommand, debug } = dependencies;
  return {
    type: 'EXEC_SET_RS232_ECHO',
    handle: ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);

      const { echoOn = false } = payload;

      const command = buildCommand({
        type: FrameType.EXECUTE_COMMAND,
        id: 5,
        value: echoOn ? '1' : '0'
      });

      return runCommand(command);
    }
  };
}
