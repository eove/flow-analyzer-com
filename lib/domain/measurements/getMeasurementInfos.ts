import * as _ from 'lodash';

export default function getMeasurementInfos(name: string): any {
  if (_.has(measurementsInfos, name)) {
    return measurementsInfos[name];
  }
  throw new Error(
    `Invalid ${name} measurement, supported ones: ${_.keys(measurementsInfos)}`
  );
}

const measurementsInfos: any = {
  highFlow: {
    id: 0,
    unit: 'l/min',
    divider: 10
  },
  lowFlow: {
    id: 1,
    unit: 'l/min',
    divider: 100
  },
  pressureLow: {
    id: 2,
    unit: 'mbar',
    divider: 1000
  },
  differentialPressure: {
    id: 3,
    unit: 'mbar',
    divider: 100
  },
  pressureHF: {
    id: 4,
    unit: 'mbar',
    divider: 100
  },
  pressureVac: {
    id: 5,
    unit: 'mbar',
    divider: 10
  },
  volumeHF: {
    id: 6,
    unit: 'ml',
    divider: 10
  },
  volumeLF: {
    id: 7,
    unit: 'l/min',
    divider: 100
  },
  currentBreathPhase: {
    id: 8
  },
  o2: {
    id: 9,
    unit: '%',
    divider: 10
  },
  humidity: {
    id: 10,
    unit: '%',
    divider: 1
  },
  temperature: {
    id: 11,
    unit: '°C',
    divider: 10
  },
  dewPoint: {
    id: 12,
    unit: '°C',
    divider: 10
  },
  highPressure: {
    id: 13,
    unit: 'mbar',
    divider: 1
  },
  ambiantPressure: {
    id: 14,
    unit: 'mbar',
    divider: 1
  },
  inspirationTime: {
    id: 19,
    unit: 's',
    divider: 100
  },
  expirationTime: {
    id: 20,
    unit: 's',
    divider: 100
  },
  ieRatio: {
    id: 21,
    divider: 10
  },
  breathRate: {
    id: 22,
    unit: 'breath/min',
    divider: 10
  },
  vti: {
    id: 23,
    unit: 'ml',
    divider: 1
  },
  vte: {
    id: 24,
    unit: 'ml',
    divider: 1
  },
  vi: {
    id: 25,
    unit: 'ml',
    divider: 10
  },
  ve: {
    id: 26,
    unit: 'ml',
    divider: 10
  },
  peakPressure: {
    id: 27,
    unit: 'mbar',
    divider: 10
  },
  meanPressure: {
    id: 28,
    unit: 'mbar',
    divider: 10
  },
  peep: {
    id: 29,
    unit: 'mbar',
    divider: 10
  },
  tiTCycle: {
    id: 30,
    unit: '%',
    divider: 10
  },
  peakFlowInsp: {
    id: 31,
    unit: 'l/min',
    divider: 10
  },
  peakFlowExp: {
    id: 32,
    unit: 'l/min',
    divider: 10
  },
  plateauPressure: {
    id: 41,
    unit: 'mbar',
    divider: 10
  },
  compliance: {
    id: 42,
    unit: 'ml/mbar',
    divider: 10
  }
};
