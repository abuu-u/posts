import { logout } from 'features/user/user-api'
import Image from 'next/future/image'
import Link from 'next/link'
import { useUser } from 'shared/hooks/use-user'
import { useAppDispatch } from 'shared/lib/store'
import styled from 'styled-components'
import { mobile, tablet } from 'styles/breakpoints'
import { routes } from '../shared/constants/routes'
import { container } from '../styles/container'

const HeaderStyled = styled.header`
  background-color: ${({ theme }) => theme.colors.cream};
`

const NavStyled = styled.nav`
  ${container}

  display: flex;

  justify-content: space-between;

  padding-top: 28px;
  padding-bottom: 28px;
`

const LogoLinkStyled = styled.a`
  display: block;

  cursor: pointer;

  @media ${({ theme }) => theme.breakpoints.mobile} {
    & img {
      width: 70px;
      height: 63px;
      object-fit: cover;
      object-position: left;
    }
  }
`

const AccountStyled = styled.span`
  display: flex;

  gap: 60px;

  align-items: center;

  font-size: 24px;
  line-height: 29px;
`

const AccountNameStyled = styled.span`
  @media ${mobile}, ${tablet} {
    font-size: 0;
    line-height: 0;
  }
`

const AccountLogout = styled.button`
  padding: 0;

  cursor: pointer;

  background: 0;
  border: 0;

  & svg {
    width: 62px;
    height: 56px;

    fill: ${({ theme }) => theme.colors.blueWater};
  }
`

export const Header = () => {
  const { name, isClient } = useUser()

  const dispatch = useAppDispatch()

  const handleLogoutClick = () => {
    dispatch(logout)
  }

  return (
    <HeaderStyled>
      <NavStyled>
        <Link href={routes.HOME}>
          <LogoLinkStyled>
            <Image
              src="/img/logo.png"
              width="273"
              height="63"
              alt="site logo"
            />
          </LogoLinkStyled>
        </Link>

        {!!name && isClient && (
          <AccountStyled>
            <AccountNameStyled>{name}</AccountNameStyled>

            <AccountLogout onClick={handleLogoutClick}>
              <svg
                width="62"
                height="56"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
                viewBox="0 0 62 56"
              >
                <path d="M61.4 26.6 47.4 15c-.3-.2-.5-.3-.8-.3-.5 0-1 .5-1 1.5v6.9h-18c-1 0-1.7.8-1.7 1.8v6c0 1 .8 1.8 1.6 1.8h18v7c0 .9.6 1.5 1.1 1.5.3 0 .5-.2.8-.4l14-11.6c.4-.3.6-.8.6-1.3s-.2-1-.6-1.3Z" />
                <path d="m50.8 44-.5.2L47 47s-.7.6-.7 1.6V50H5V6h41.3v1.4c0 .8.7 1.4.7 1.4l3.7 3 .3.2c.2 0 .4-.2.4-1V4.7C51.3 2 49.6 0 47.4 0H4.1C1.8 0 0 2 0 4.6V51c0 2.6 1.9 4.8 4.1 4.8h43.3c2.2 0 4-2.1 4-4.8v-5.8c0-1-.4-1.2-.6-1.2Zm.4-32.8Zm0 .1Zm0 33.7Zm0 0Z" />
              </svg>
            </AccountLogout>
          </AccountStyled>
        )}
      </NavStyled>
    </HeaderStyled>
  )
}
