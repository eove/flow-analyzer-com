import { ProtocolAnswer } from '../../protocol';
import { formatValue } from '../common';

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
      valueAsString: computedValue ? `${computedValue}` : '-',
    };
  };
}
