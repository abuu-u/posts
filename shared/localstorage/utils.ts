export const getLocalStorageItemIfInBrowser = <T>(callback: () => T) =>
  typeof window !== 'undefined' ? callback() : undefined
