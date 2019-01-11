import { ProtocolAnswer } from '../../protocol';

interface FormatCreation {
  name: string;
  id: number;
  valueToName: (name: string) => string;
  unit?: string;
}

export default function makeFormatSettingAnswer(
  creation: FormatCreation
): (answer: ProtocolAnswer) => any {
  const { valueToName = (v: any) => v, name, unit } = creation;

  return (answer: ProtocolAnswer): any => {
    const { id, value } = answer;
    const computedValue = value ? valueToName(`${value}`) : value;
    const displayValue = computedValue
      ? unit
        ? `${computedValue} ${unit}`
        : `${computedValue}`
      : '-';
    return {
      id,
      name,
      value,
      unit,
      displayValue
    };
  };
}
