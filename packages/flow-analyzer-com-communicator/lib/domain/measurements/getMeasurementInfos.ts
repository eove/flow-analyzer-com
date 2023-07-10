import { DeviceType } from '../DeviceType';

export default function getMeasurementInfos(
  name: string,
  deviceType: DeviceType
): MeasurementInfo {
  const supportedMeasurements = getSupportedMeasurementInfos();

  const found = supportedMeasurements.filter(
    (s) => s.name === name && s.deviceTypes.includes(deviceType)
  );
  if (found.length) {
    return found[0];
  }
  throw new Error(
    `Invalid ${name} measurement, supported ones: ${supportedMeasurements.map(
      (s: any) => s.name
    )}`
  );
}

export function getAllMeasurementInfos(): MeasurementInfo[] {
  return getSupportedMeasurementInfos();
}

function getSupportedMeasurementInfos(): MeasurementInfo[] {
  return measurementsInfos;
}

interface MeasurementInfo {
  name: string;
  id: number;
  unit?: string;
  divider?: number;
  deviceTypes: DeviceType[];
}

const allDeviceTypes = [
  DeviceType.CITREX_H4,
  DeviceType.CITREX_H5,
  DeviceType.PF300,
  DeviceType.PF300_PRO,
];

const measurementsInfos: MeasurementInfo[] = [
  {
    name: 'highFlow',
    id: 0,
    unit: 'l/min',
    divider: 10,
    deviceTypes: [DeviceType.CITREX_H4, DeviceType.CITREX_H5, DeviceType.PF300],
  },
  {
    name: 'highFlow',
    id: 0,
    unit: 'l/min',
    divider: 100,
    deviceTypes: [DeviceType.PF300_PRO],
  },
  {
    name: 'lowFlow',
    id: 1,
    unit: 'l/min',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'pressureLow',
    id: 2,
    unit: 'mbar',
    divider: 1000,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'differentialPressure',
    id: 3,
    unit: 'mbar',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'pressureHF',
    id: 4,
    unit: 'mbar',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'pressureVac',
    id: 5,
    unit: 'mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'volumeHF',
    id: 6,
    unit: 'ml',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'volumeLF',
    id: 7,
    unit: 'l/min',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'currentBreathPhase',
    id: 8,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'o2',
    id: 9,
    unit: '%',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'humidity',
    id: 10,
    unit: '%',
    divider: 1,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'temperature',
    id: 11,
    unit: '°C',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'dewPoint',
    id: 12,
    unit: '°C',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'highPressure',
    id: 13,
    unit: 'mbar',
    divider: 1,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'ambiantPressure',
    id: 14,
    unit: 'mbar',
    divider: 1,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'inspirationTime',
    id: 19,
    unit: 's',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'expirationTime',
    id: 20,
    unit: 's',
    divider: 100,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'ieRatio',
    id: 21,
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'breathRate',
    id: 22,
    unit: 'breath/min',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'vti',
    id: 23,
    unit: 'ml',
    divider: 1,
    deviceTypes: [DeviceType.CITREX_H4, DeviceType.CITREX_H5, DeviceType.PF300],
  },
  {
    name: 'vti',
    id: 23,
    unit: 'ml',
    divider: 10,
    deviceTypes: [DeviceType.PF300_PRO],
  },
  {
    name: 'vte',
    id: 24,
    unit: 'ml',
    divider: 1,
    deviceTypes: [DeviceType.CITREX_H4, DeviceType.CITREX_H5, DeviceType.PF300],
  },
  {
    name: 'vte',
    id: 24,
    unit: 'ml',
    divider: 10,
    deviceTypes: [DeviceType.PF300_PRO],
  },
  {
    name: 'vi',
    id: 25,
    unit: 'ml',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 've',
    id: 26,
    unit: 'ml',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'peakPressure',
    id: 27,
    unit: 'mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'meanPressure',
    id: 28,
    unit: 'mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'peep',
    id: 29,
    unit: 'mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'tiTCycle',
    id: 30,
    unit: '%',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'peakFlowInsp',
    id: 31,
    unit: 'l/min',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'peakFlowExp',
    id: 32,
    unit: 'l/min',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'plateauPressure',
    id: 41,
    unit: 'mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
  {
    name: 'compliance',
    id: 42,
    unit: 'ml/mbar',
    divider: 10,
    deviceTypes: allDeviceTypes,
  },
];
