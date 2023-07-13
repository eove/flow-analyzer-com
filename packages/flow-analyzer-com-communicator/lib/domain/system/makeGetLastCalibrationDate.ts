import * as _ from 'lodash';
import { FrameType } from '../../protocol';
import { DomainCommandHandlerFactoryDependencies } from '../DomainTypes';

export function makeGetLastCalibrationDate(
  dependencies: DomainCommandHandlerFactoryDependencies
) {
  const { runCommand, buildCommand } = dependencies;

  return async function getLastCalibrationDate(): Promise<string | undefined> {
    try {
      const day = await getLastCalibrationDay();
      const month = await getLastCalibrationMonth();
      const year = await getLastCalibrationYear();
      return `${year}-${month}-${day}`;
    } catch (error) {
      return undefined;
    }

    function getLastCalibrationDay(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 5,
      });
      return runCommand(command).then((answer) =>
        _.padStart(`${answer.value}`, 2, '0')
      );
    }

    function getLastCalibrationMonth(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 6,
      });
      return runCommand(command).then((answer) =>
        _.padStart(`${answer.value}`, 2, '0')
      );
    }

    function getLastCalibrationYear(): Promise<any> {
      const command = buildCommand({
        type: FrameType.READ_SYSTEM_INFO,
        id: 7,
      });
      return runCommand(command).then((answer) => `${answer.value}`);
    }
  };
}
