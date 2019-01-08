import { ProtocolAnswer } from '../../protocol';

const NULL_VALUE = '-2147483648';

export default function makeFormatMeasurementAnswer(
  name: string,
  divider?: number,
  unit?: string
): (answer: ProtocolAnswer) => any {
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
