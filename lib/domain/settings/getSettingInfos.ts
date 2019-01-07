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
    toUnderstandable: (value: string): string => {
      const mapping: any = {
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
        '10': 'Custom gas, defined by density and dyn. Viscosity'
      };

      if (_.has(mapping, value)) {
        return mapping[value];
      }
      return '???';
    }
  },
  manualOxygenConcentration: {
    id: 2,
    unit: '%'
  }
};
