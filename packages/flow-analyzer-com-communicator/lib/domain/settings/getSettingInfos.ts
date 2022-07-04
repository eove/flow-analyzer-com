import * as _ from 'lodash';
import { DeviceTypes } from '../DeviceTypes';

export default function getSettingInfos(
  name: string,
  deviceType: DeviceTypes
): SettingInfo {
  const supportedSettings = getSupportedSettingInfos(deviceType);

  const found = supportedSettings.filter((s) => s.name === name);
  if (found.length) {
    return found[0];
  }
  throw new Error(
    `Invalid ${name} setting, supported ones: ${supportedSettings.map(
      (s: any) => s.name
    )}`
  );
}

export function getAllSettingInfos(deviceType: string): SettingInfo[] {
  return getSupportedSettingInfos(deviceType);
}

function getSupportedSettingInfos(deviceType: string): SettingInfo[] {
  return settingsInfos.filter((s) => _.includes(s.supportedBy, deviceType));
}

interface SettingInfo {
  name: string;
  id: number;
  unit?: string;
  valueToName?: (value: string) => string;
  nameToValue?: (value: string) => string;
  allNames?: () => string[];
  allValues?: () => string[];
  supportedBy: string[];
}

const settingsInfos: SettingInfo[] = [
  {
    name: 'gazType',
    id: 1,
    valueToName: (value: string): string => GAZ_TYPE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => GAZ_TYPE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(GAZ_TYPE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(GAZ_TYPE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'manualOxygenConcentration',
    id: 2,
    unit: '%',
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'gazStandards',
    id: 3,
    valueToName: (value: string): string => GAZ_STANDARDS_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => GAZ_STANDARDS_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(GAZ_STANDARDS_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(GAZ_STANDARDS_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'respMode',
    id: 4,
    valueToName: (value: string): string => RESP_MODE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => RESP_MODE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(RESP_MODE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(RESP_MODE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'triggerSource',
    id: 5,
    valueToName: (value: string): string => TRIGGER_SOURCE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => TRIGGER_SOURCE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(TRIGGER_SOURCE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(TRIGGER_SOURCE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'startTriggerSignal',
    id: 6,
    valueToName: (value: string): string =>
      START_TRIGGER_SIGNAL_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      START_TRIGGER_SIGNAL_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(START_TRIGGER_SIGNAL_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(START_TRIGGER_SIGNAL_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'startTriggerEdge',
    id: 7,
    valueToName: (value: string): string =>
      START_TRIGGER_EDGE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      START_TRIGGER_EDGE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(START_TRIGGER_EDGE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(START_TRIGGER_EDGE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'startTriggerSignalValue',
    id: 8,
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'endTriggerSignal',
    id: 9,
    valueToName: (value: string): string =>
      END_TRIGGER_SIGNAL_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      END_TRIGGER_SIGNAL_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(END_TRIGGER_SIGNAL_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(END_TRIGGER_SIGNAL_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'endTriggerEdge',
    id: 10,
    valueToName: (value: string): string =>
      END_TRIGGER_EDGE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => END_TRIGGER_EDGE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(END_TRIGGER_EDGE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(END_TRIGGER_EDGE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'endTriggerSignalValue',
    id: 11,
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'triggerDelay',
    id: 12,
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'baseFlowEnabled',
    id: 13,
    valueToName: (value: string): string =>
      BASE_FLOW_ENABLED_VALUE_TO_NAME[value],
    nameToValue: (name: string): string =>
      BASE_FLOW_ENABLED_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(BASE_FLOW_ENABLED_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(BASE_FLOW_ENABLED_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'baseFlowValue',
    id: 14,
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'filterType',
    id: 15,
    valueToName: (value: string): string => FILTER_TYPE_VALUE_TO_NAME[value],
    nameToValue: (name: string): string => FILTER_TYPE_NAME_TO_VALUE[name],
    allNames: (): string[] => _.values(FILTER_TYPE_VALUE_TO_NAME),
    allValues: (): string[] => _.keys(FILTER_TYPE_VALUE_TO_NAME),
    supportedBy: [DeviceTypes.CITREX_H4, DeviceTypes.PF300],
  },
  {
    name: 'startTriggerDelay',
    id: 19,
    supportedBy: [DeviceTypes.CITREX_H4],
  },
  {
    name: 'endTriggerDelay',
    id: 20,
    supportedBy: [DeviceTypes.CITREX_H4],
  },
  {
    name: 'gazHumidity',
    id: 21,
    supportedBy: [DeviceTypes.CITREX_H4],
  },
  {
    name: 'respParamPressureSource',
    id: 22,
    supportedBy: [DeviceTypes.CITREX_H4],
  },
];

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
  '10': 'Custom gas',
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
  '12': 'Ambient Temperature and Pressure - Saturated',
};

const GAZ_STANDARDS_NAME_TO_VALUE = _.invert(GAZ_STANDARDS_VALUE_TO_NAME);

const RESP_MODE_VALUE_TO_NAME: any = {
  '0': 'Adult',
  '1': 'Pediatric',
  '2': 'High Frequency',
};
const RESP_MODE_NAME_TO_VALUE = _.invert(RESP_MODE_VALUE_TO_NAME);

const TRIGGER_SOURCE_VALUE_TO_NAME: any = {
  '1': 'internal High Flow Channel',
  '2': 'internal Low Flow Channel (FlowAnalyser only)',
  '3': 'external High Flow Channel',
  '4': 'external Low Flow Channel (FlowAnalyser only)',
};
const TRIGGER_SOURCE_NAME_TO_VALUE = _.invert(TRIGGER_SOURCE_VALUE_TO_NAME);

const START_TRIGGER_SIGNAL_VALUE_TO_NAME: any = {
  '0': 'Flow',
  '1': 'Pressure',
};
const START_TRIGGER_SIGNAL_NAME_TO_VALUE = _.invert(
  START_TRIGGER_SIGNAL_VALUE_TO_NAME
);

const START_TRIGGER_EDGE_VALUE_TO_NAME: any = {
  '0': 'Rising',
  '1': 'Falling',
};
const START_TRIGGER_EDGE_NAME_TO_VALUE = _.invert(
  START_TRIGGER_EDGE_VALUE_TO_NAME
);

const END_TRIGGER_SIGNAL_VALUE_TO_NAME: any = {
  '0': 'Flow',
  '1': 'Pressure',
};
const END_TRIGGER_SIGNAL_NAME_TO_VALUE = _.invert(
  END_TRIGGER_SIGNAL_VALUE_TO_NAME
);

const END_TRIGGER_EDGE_VALUE_TO_NAME: any = {
  '0': 'Rising',
  '1': 'Falling',
};
const END_TRIGGER_EDGE_NAME_TO_VALUE = _.invert(END_TRIGGER_EDGE_VALUE_TO_NAME);

const BASE_FLOW_ENABLED_VALUE_TO_NAME: any = {
  '0': 'False',
  '1': 'True',
};
const BASE_FLOW_ENABLED_NAME_TO_VALUE = _.invert(
  BASE_FLOW_ENABLED_VALUE_TO_NAME
);

const FILTER_TYPE_VALUE_TO_NAME: any = {
  '0': 'None',
  '1': 'Filter Low',
  '2': 'Filter Medium',
  '3': 'Filter High',
};
const FILTER_TYPE_NAME_TO_VALUE = _.invert(FILTER_TYPE_VALUE_TO_NAME);
