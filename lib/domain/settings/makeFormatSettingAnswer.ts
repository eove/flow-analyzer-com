import { ProtocolAnswer } from '../../protocol';
import getSettingInfos from './getSettingInfos';

export default function makeFormatSettingAnswer(
  name: string
): (answer: ProtocolAnswer) => any {
  const { unit, toUnderstandable } = getSettingInfos(name);

  return (answer: ProtocolAnswer): any => {
    const { id, value } = answer;
    const computedValue =
      toUnderstandable && value ? toUnderstandable(value) : value;
    const displayValue = unit ? `${computedValue} ${unit}` : `${computedValue}`;
    return {
      id,
      name,
      value,
      unit,
      displayValue
    };
  };
}
