import { ComponentType, PropsWithChildren } from 'react'
import { Header } from './header'

export const Layout: ComponentType<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />

      {children}
    </>
  )
}
