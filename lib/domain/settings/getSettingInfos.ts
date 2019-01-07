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
  },
  gazStandards: {
    id: 3,
    toUnderstandable: (value: string): string => {
      const mapping: any = {
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
        '10': 'Standard Temperature and Pressure, Humid (21.1°C, 1013.25mbar)',
        '11': 'Ambient Temperature and Pressure, Dry',
        '12': 'Ambient Temperature and Pressure, Saturated'
      };

      if (_.has(mapping, value)) {
        return mapping[value];
      }
      return '???';
    }
  },
  respMode: {
    id: 3,
    toUnderstandable: (value: string): string => {
      const mapping: any = {
        '0': 'Adult',
        '1': 'Pediatric',
        '2': 'High Frequency'
      };

      if (_.has(mapping, value)) {
        return mapping[value];
      }
      return '???';
    }
  },
  triggerSource: {
    id: 3,
    toUnderstandable: (value: string): string => {
      const mapping: any = {
        '1': 'internal High Flow Channel',
        '2': 'internal Low Flow Channel (FlowAnalyser only)',
        '3': 'external High Flow Channel',
        '4': 'external Low Flow Channel (FlowAnalyser only)'
      };

      if (_.has(mapping, value)) {
        return mapping[value];
      }
      return '???';
    }
  },
  startTriggerSignal: {
    id: 4,
    toUnderstandable: (value: string): string => {
      const mapping: any = {
        '0': 'Flow',
        '1': 'Pressure'
      };

      if (_.has(mapping, value)) {
        return mapping[value];
      }
      return '???';
    }
  }
};
