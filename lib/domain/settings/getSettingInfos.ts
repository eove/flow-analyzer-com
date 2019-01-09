import * as _ from 'lodash';

export default function getSettingInfos(name: string): any {
  if (_.has(settingsInfos, name)) {
    return settingsInfos[name];
  }
  throw new Error(
    `Invalid ${name} setting, supported ones: ${_.keys(settingsInfos)}`
  );
}

const settingsInfos: any = {
  gazType: {
    id: 1,
    valueToName: (value: string): string => GAZ_TYPE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => GAZ_TYPE_NAME_TO_VALUE[name],
    allNames: () => _.values(GAZ_TYPE_VALUE_TO_NAME),
    allValues: () => _.keys(GAZ_TYPE_VALUE_TO_NAME)
  },
  manualOxygenConcentration: {
    id: 2,
    unit: '%'
  },
  gazStandards: {
    id: 3,
    valueToName: (value: string): string => GAZ_STANDARDS_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => GAZ_STANDARDS_NAME_TO_VALUE[name],
    allNames: () => _.values(GAZ_STANDARDS_VALUE_TO_NAME),
    allValues: () => _.keys(GAZ_STANDARDS_VALUE_TO_NAME)
  },
  respMode: {
    id: 4,
    valueToName: (value: string): string => RESP_MODE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => RESP_MODE_NAME_TO_VALUE[name],
    allNames: () => _.values(RESP_MODE_VALUE_TO_NAME),
    allValues: () => _.keys(RESP_MODE_VALUE_TO_NAME)
  },
  triggerSource: {
    id: 5,
    valueToName: (value: string): string => TRIGGER_SOURCE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => TRIGGER_SOURCE_NAME_TO_VALUE[name],
    allNames: () => _.values(TRIGGER_SOURCE_VALUE_TO_NAME),
    allValues: () => _.keys(TRIGGER_SOURCE_VALUE_TO_NAME)
  },
  startTriggerSignal: {
    id: 6,
    valueToName: (value: string): string =>
      START_TRIGGER_SIGNAL_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      START_TRIGGER_SIGNAL_NAME_TO_VALUE[name],
    allNames: () => _.values(START_TRIGGER_SIGNAL_VALUE_TO_NAME),
    allValues: () => _.keys(START_TRIGGER_SIGNAL_VALUE_TO_NAME)
  },
  startTriggerEdge: {
    id: 7,
    valueToName: (value: string): string =>
      START_TRIGGER_EDGE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      START_TRIGGER_EDGE_NAME_TO_VALUE[name],
    allNames: () => _.values(START_TRIGGER_EDGE_VALUE_TO_NAME),
    allValues: () => _.keys(START_TRIGGER_EDGE_VALUE_TO_NAME)
  }
};

const GAZ_TYPE_VALUE_TO_NAME: any = {
  '0': 'Air',
  '1': 'Air/O2-man.',
  '2': 'Air/O2-aut.',
  '3': 'N2O/O2-man.',
  '4': 'N2O/O2-aut.',
  '5': 'Heliox',
  '6': 'He/O2-man.',
  '7': 'He/O2-aut.',
  '8': 'N2',
  '9': 'CO2',
  '10': 'Custom gas'
};
const GAZ_TYPE_NAME_TO_VALUE = _.invert(GAZ_TYPE_VALUE_TO_NAME);

const GAZ_STANDARDS_VALUE_TO_NAME: any = {
  '0': 'Ambient Temperature and Pressure and Humidity',
  '1': 'Standard T emperature and Pressure (21.1° C, 10 13.25mbar)',
  '2': 'Body Temperature and Pressure, Saturated',
  '3': 'Body Temperature and Pressure, Dry',
  '4': '0°C, 1013.25mbar, Dry',
  '5': '20°C, 981mbar, Dry',
  '6': '15°C, 1013mbar, Dry',
  '7': '20°C, 1013mbar, Dry',
  '8': '25°C, 991mbar, Dry',
  '9': 'Ambient Pressure 21°, Dry',
  '10': 'Standard Temperature and Pressure - Humid',
  '11': 'Ambient Temperature and Pressure - Dry',
  '12': 'Ambient Temperature and Pressure - Saturated'
};

const GAZ_STANDARDS_NAME_TO_VALUE = _.invert(GAZ_STANDARDS_VALUE_TO_NAME);

const RESP_MODE_VALUE_TO_NAME: any = {
  '0': 'Adult',
  '1': 'Pediatric',
  '2': 'High Frequency'
};
const RESP_MODE_NAME_TO_VALUE = _.invert(RESP_MODE_VALUE_TO_NAME);

const TRIGGER_SOURCE_VALUE_TO_NAME: any = {
  '1': 'internal High Flow Channel',
  '2': 'internal Low Flow Channel (FlowAnalyser only)',
  '3': 'external High Flow Channel',
  '4': 'external Low Flow Channel (FlowAnalyser only)'
};
const TRIGGER_SOURCE_NAME_TO_VALUE = _.invert(TRIGGER_SOURCE_VALUE_TO_NAME);

const START_TRIGGER_SIGNAL_VALUE_TO_NAME: any = {
  '0': 'Flow',
  '1': 'Pressure'
};
const START_TRIGGER_SIGNAL_NAME_TO_VALUE = _.invert(
  START_TRIGGER_SIGNAL_VALUE_TO_NAME
);

const START_TRIGGER_EDGE_VALUE_TO_NAME: any = {
  '0': 'Rising',
  '1': 'Falling'
};
const START_TRIGGER_EDGE_NAME_TO_VALUE = _.invert(
  START_TRIGGER_EDGE_VALUE_TO_NAME
);
