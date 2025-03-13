export const searchResults = <T extends Record<K, string>, K extends keyof T>(
  term: string,
  items: T[],
  key: K
): T[] => {
  return items.filter((item) => item[key].toLowerCase().includes(term.toLowerCase()))
}
