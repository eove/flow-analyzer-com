import { ProtocolAnswer } from '../../protocol';

const NULL_VALUE = '-2147483648';

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
    const computedValue =
      value && value !== NULL_VALUE
        ? divider
          ? Number(value) / divider
          : Number(value)
        : null;
    return {
      id,
      name,
      value: computedValue,
      unit,
      displayValue: computedValue ? `${computedValue} ${unit}` : '-'
    };
  };
}
