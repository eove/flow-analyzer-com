import { ProtocolAnswer } from '../../protocol';
import getMeasurementInfos from './getMeasurementInfos';

const NULL_VALUE = '-2147483648';

export default function makeFormatMeasurementAnswer(
  name: string
): (answer: ProtocolAnswer) => any {
  const { divider, unit } = getMeasurementInfos(name);

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
