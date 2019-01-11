import { ProtocolAnswer } from '../../protocol';

interface FormatCreation {
  name: string;
  divider?: number;
  unit?: string;
}

export default function makeFormatMeasurementAnswer(
  creation: FormatCreation
): (answer: ProtocolAnswer) => any {
  const { divider, unit, name } = creation;

  return (answer: ProtocolAnswer): any => {
    const { id, value } = answer;
    const computedValue = formatValue(value, divider);

    return {
      id,
      name,
      value: computedValue,
      unit,
      displayValue: computedValue ? `${computedValue} ${unit}` : '-'
    };
  };
}

function formatValue(value: any, divider: any): any {
  return value && typeof value === 'number' && divider
    ? value / divider
    : value;
}
