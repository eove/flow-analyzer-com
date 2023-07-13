import * as _ from 'lodash';
import {
  DomainCommand,
  DomainCommandHandler,
  DomainCommandHandlerFactoryDependencies,
} from '../DomainTypes';
import { makeGetDeviceType } from './makeGetDeviceType';
import { makeGetFPGAVersion } from './makeGetFPGAVersion';
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
  const getFPGAVersion = makeGetFPGAVersion(dependencies);
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
        fpgaVersion,
        serialNumber,
        lastCalibrationDate,
        nextCalibrationDate,
      } = _.defaults({}, payload, {
        deviceType: true,
        hardwareVersion: true,
        softwareVersion: true,
        fpgaVersion: true,
        serialNumber: true,
        lastCalibrationDate: false,
        nextCalibrationDate: false,
      });

      const result = {};

      if (hardwareVersion) {
        Object.assign(result, { hardwareVersion: await getHardwareVersion() });
      }
      if (softwareVersion) {
        Object.assign(result, { softwareVersion: await getSoftwareVersion() });
      }
      if (fpgaVersion) {
        Object.assign(result, { fpgaVersion: await getFPGAVersion() });
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
      if (deviceType) {
        Object.assign(result, { deviceType: await getDeviceType() });
      }

      return result;
    },
  };
}
