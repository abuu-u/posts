import { localstorageKeys } from 'shared/constants/localstorage-keys'

export const setName = (name: string) =>
  localStorage.setItem(localstorageKeys.NAME, name)

export const getName = () =>
  localStorage.getItem(localstorageKeys.NAME) ?? undefined

export const removeName = () => localStorage.removeItem(localstorageKeys.NAME)
