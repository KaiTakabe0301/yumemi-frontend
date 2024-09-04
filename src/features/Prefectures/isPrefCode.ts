export function isPrefCode(arg0: string): boolean {
  const validPrefCodes = new Set([...Array(47).keys()].map((i) => (i + 1).toString()));
  return validPrefCodes.has(arg0);
}
