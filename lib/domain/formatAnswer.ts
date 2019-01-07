import { ProtocolAnswer } from '../protocol';

const NULL_VALUE = '-2147483648';

export default function formatAnswer(
  answer: ProtocolAnswer,
  infos: { divider: number; unit: string }
): any {
  const { id, value } = answer;
  const { divider, unit } = infos;
  const computedValue =
    value && value !== NULL_VALUE
      ? divider
        ? Number(value) / divider
        : Number(value)
      : null;
  return {
    id,
    value: computedValue,
    unit,
    displayValue: computedValue ? `${computedValue} ${unit}` : '-'
  };
}
