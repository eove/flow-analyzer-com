import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetNextCalibrationDate(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return async function getNextCalibrationDate(): Promise<string | undefined> {
    try {
      const day = await getNextCalibrationDay();
      const month = await getNextCalibrationMonth();
      const year = await getNextCalibrationYear();
      return `${year}-${month}-${day}`;
    } catch (error) {
      return undefined;
    }

    function getNextCalibrationDay(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 9,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getNextCalibrationMonth(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 10,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }

    function getNextCalibrationYear(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 11,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }
  };
}
