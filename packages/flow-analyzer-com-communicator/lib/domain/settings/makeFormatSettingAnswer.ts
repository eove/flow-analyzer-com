import { ProtocolAnswer } from '../../protocol';

interface FormatCreation {
  name: string;
  id: number;
  valueToName?: (name: string) => string;
  unit?: string;
}

export default function makeFormatSettingAnswer(
  creation: FormatCreation
): (answer: ProtocolAnswer) => any {
  const { valueToName = (v: any) => v, name, unit } = creation;

  return (answer: ProtocolAnswer): any => {
    const { id, value } = answer;
    const computedValue =
      typeof value === 'number' ? valueToName(`${value}`) : value;
    const valueAsString = computedValue ? `${computedValue}` : '-';
    return {
      id,
      name,
      value,
      unit,
      valueAsString,
    };
  };
}
