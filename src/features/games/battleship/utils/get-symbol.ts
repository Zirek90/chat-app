export function getSymbol(value: string | null) {
  if (value === 'hit') return '🔴';
  if (value === 'miss') return '⚪';
  if (value) return '🚢';
  return '🔵';
}
