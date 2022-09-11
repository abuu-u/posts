import { css } from 'styled-components'
import { desktop, mobile, tablet } from './breakpoints'

export const container = () => css`
  margin: auto;

  @media ${mobile} {
    padding-right: ${({ theme }) => theme.padding.container.mobile};
    padding-left: ${({ theme }) => theme.padding.container.mobile};
  }

  @media ${tablet} {
    padding-right: ${({ theme }) => theme.padding.container.tablet};
    padding-left: ${({ theme }) => theme.padding.container.tablet};
  }

  @media ${desktop} {
    padding-right: ${({ theme }) => theme.padding.container.desktop};
    padding-left: ${({ theme }) => theme.padding.container.desktop};
  }
`
