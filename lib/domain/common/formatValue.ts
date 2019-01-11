export function formatValue(value: any, divider: any): any {
  return value && typeof value === 'number' && divider
    ? value / divider
    : value;
}
