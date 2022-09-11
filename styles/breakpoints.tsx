import { css } from 'styled-components'

export const mobile = () => css`
  ${({ theme }) => theme.breakpoints.mobile}
`

export const tablet = () => css`
  ${({ theme }) => theme.breakpoints.tablet}
`

export const desktop = () => css`
  ${({ theme }) => theme.breakpoints.desktop}
`
