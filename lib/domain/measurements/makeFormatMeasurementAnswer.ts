import { ProtocolAnswer } from '../../protocol';

interface FormatCreation {
  name: string;
  id: number;
  divider?: number;
  unit?: string;
}

export default function makeFormatMeasurementAnswer(
  creation: FormatCreation
): (answer: ProtocolAnswer) => any {
  const { divider, unit, name, id } = creation;

  return (answer: ProtocolAnswer): any => {
    const { value } = answer;
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
