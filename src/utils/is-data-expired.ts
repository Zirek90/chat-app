export function isDataExpired(lastUpdated: number, maxHours: number): boolean {
  return Date.now() - lastUpdated > maxHours * 60 * 60 * 1000;
}
