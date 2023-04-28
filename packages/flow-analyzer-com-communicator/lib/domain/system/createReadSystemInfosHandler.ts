import * as _ from 'lodash';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import { makeGetDeviceType } from './makeGetDeviceType';
import { makeGetHardwareVersion } from './makeGetHardwareVersion';
import { makeGetLastCalibrationDate } from './makeGetLastCalibrationDate';
import { makeGetNextCalibrationDate } from './makeGetNextCalibrationDate';
import { makeGetSerialNumber } from './makeGetSerialNumber';
import { makeGetSoftwareVersion } from './makeGetSoftwareVersion';

export default function createReadSystemInfosHandler(
  dependencies: DomainCommandHandlerFactoryDependencies
): DomainCommandHandler {
  const { debug } = dependencies;

  const getSerialNumber = makeGetSerialNumber(dependencies);
  const getHardwareVersion = makeGetHardwareVersion(dependencies);
  const getSoftwareVersion = makeGetSoftwareVersion(dependencies);
  const getLastCalibrationDate = makeGetLastCalibrationDate(dependencies);
  const getNextCalibrationDate = makeGetNextCalibrationDate(dependencies);
  const getDeviceType = makeGetDeviceType(dependencies);

  return {
    type: 'READ_SYSTEM_INFOS',
    handle: async ({ type, payload }: DomainCommand) => {
      debug(`running ${type} command handler...`);
      const {
        deviceType,
        hardwareVersion,
        softwareVersion,
        serialNumber,
        lastCalibrationDate,
        nextCalibrationDate,
      } = _.defaults({}, payload, {
        deviceType: false,
        hardwareVersion: true,
        softwareVersion: true,
        serialNumber: true,
        lastCalibrationDate: false,
        nextCalibrationDate: false,
      });

      const result = {};
      if (deviceType) {
        Object.assign(result, { deviceType: await getDeviceType() });
      }
      if (hardwareVersion) {
        Object.assign(result, { hardwareVersion: await getHardwareVersion() });
      }
      if (softwareVersion) {
        Object.assign(result, { softwareVersion: await getSoftwareVersion() });
      }
      if (serialNumber) {
        Object.assign(result, { serialNumber: await getSerialNumber() });
      }
      if (lastCalibrationDate) {
        Object.assign(result, {
          lastCalibrationDate: await getLastCalibrationDate(),
        });
      }
      if (nextCalibrationDate) {
        Object.assign(result, {
          nextCalibrationDate: await getNextCalibrationDate(),
        });
      }

      return result;
    },
  };
}
