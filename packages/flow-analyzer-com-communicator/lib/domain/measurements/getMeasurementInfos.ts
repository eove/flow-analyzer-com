export default function getMeasurementInfos(name: string): MeasurementInfo {
  const supportedMeasurements = getSupportedMeasurementInfos();

  const found = supportedMeasurements.filter((s) => s.name === name);
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
}

const measurementsInfos: MeasurementInfo[] = [
  {
    name: 'highFlow',
    id: 0,
    unit: 'l/min',
    divider: 10,
  },
  {
    name: 'lowFlow',
    id: 1,
    unit: 'l/min',
    divider: 100,
  },
  {
    name: 'pressureLow',
    id: 2,
    unit: 'mbar',
    divider: 1000,
  },
  {
    name: 'differentialPressure',
    id: 3,
    unit: 'mbar',
    divider: 100,
  },
  {
    name: 'pressureHF',
    id: 4,
    unit: 'mbar',
    divider: 100,
  },
  {
    name: 'pressureVac',
    id: 5,
    unit: 'mbar',
    divider: 10,
  },
  {
    name: 'volumeHF',
    id: 6,
    unit: 'ml',
    divider: 10,
  },
  {
    name: 'volumeLF',
    id: 7,
    unit: 'l/min',
    divider: 100,
  },
  {
    name: 'currentBreathPhase',
    id: 8,
  },
  {
    name: 'o2',
    id: 9,
    unit: '%',
    divider: 10,
  },
  {
    name: 'humidity',
    id: 10,
    unit: '%',
    divider: 1,
  },
  {
    name: 'temperature',
    id: 11,
    unit: '°C',
    divider: 10,
  },
  {
    name: 'dewPoint',
    id: 12,
    unit: '°C',
    divider: 10,
  },
  {
    name: 'highPressure',
    id: 13,
    unit: 'mbar',
    divider: 1,
  },
  {
    name: 'ambiantPressure',
    id: 14,
    unit: 'mbar',
    divider: 1,
  },
  {
    name: 'inspirationTime',
    id: 19,
    unit: 's',
    divider: 100,
  },
  {
    name: 'expirationTime',
    id: 20,
    unit: 's',
    divider: 100,
  },
  {
    name: 'ieRatio',
    id: 21,
    divider: 10,
  },
  {
    name: 'breathRate',
    id: 22,
    unit: 'breath/min',
    divider: 10,
  },
  {
    name: 'vti',
    id: 23,
    unit: 'ml',
    divider: 1,
  },
  {
    name: 'vte',
    id: 24,
    unit: 'ml',
    divider: 1,
  },
  {
    name: 'vi',
    id: 25,
    unit: 'ml',
    divider: 10,
  },
  {
    name: 've',
    id: 26,
    unit: 'ml',
    divider: 10,
  },
  {
    name: 'peakPressure',
    id: 27,
    unit: 'mbar',
    divider: 10,
  },
  {
    name: 'meanPressure',
    id: 28,
    unit: 'mbar',
    divider: 10,
  },
  {
    name: 'peep',
    id: 29,
    unit: 'mbar',
    divider: 10,
  },
  {
    name: 'tiTCycle',
    id: 30,
    unit: '%',
    divider: 10,
  },
  {
    name: 'peakFlowInsp',
    id: 31,
    unit: 'l/min',
    divider: 10,
  },
  {
    name: 'peakFlowExp',
    id: 32,
    unit: 'l/min',
    divider: 10,
  },
  {
    name: 'plateauPressure',
    id: 41,
    unit: 'mbar',
    divider: 10,
  },
  {
    name: 'compliance',
    id: 42,
    unit: 'ml/mbar',
    divider: 10,
  },
];
