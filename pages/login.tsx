import { yupResolver } from '@hookform/resolvers/yup'
import { login, LoginRequest } from 'features/user/user-api'
import { resetUserState, selectUserError } from 'features/user/user-store'
import { loginValidationSchema } from 'features/user/user-validation'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { routes } from 'shared/constants/routes'
import { useUser } from 'shared/hooks/use-user'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import styled from 'styled-components'
import { desktop, mobile, tablet } from '../styles/breakpoints'
import { container } from '../styles/container'

const ContainerStyled = styled.div`
  ${container}

  @media ${mobile} {
    margin-top: 14px;
  }

  @media ${tablet} {
    margin-top: 284px;
  }

  @media ${desktop} {
    margin-top: 229px;
  }
`

const FormStyled = styled.form`
  display: flex;

  flex-direction: column;

  font-size: 24px;
  line-height: 29px;

  border: 5px solid ${({ theme }) => theme.colors.blueWater};
  border-radius: 5px;

  @media ${mobile} {
    gap: 13px;

    padding: 16px 43px 32px 34px;
  }

  @media ${tablet}, ${desktop} {
    gap: 25px;

    width: 480px;
    padding: 45px 20px 27px;
    margin: auto;
  }
`

const HaderStyled = styled.h1`
  margin: 0;

  font-size: inherit;
  line-height: inherit;
  color: ${({ theme }) => theme.colors.blueWater};
  text-align: center;
`

const ErrorStyled = styled.p`
  padding: 10px;
  margin: 0;

  color: #fff;

  background-color: ${({ theme }) => theme.colors.error};

  border-radius: 10px;
`

const LabelStyled = styled.label`
  display: flex;

  flex-wrap: wrap;

  gap: 13px;

  @media ${mobile} {
    flex-direction: column;
  }

  @media ${tablet}, ${desktop} {
    align-items: center;
    justify-content: space-between;
  }
`

const InputStyled = styled.input`
  font-size: inherit;
  line-height: inherit;

  border: 4px solid ${({ theme }) => theme.colors.blueWater};
  border-radius: 10px;

  &:autofill {
    font-size: inherit;
    line-height: inherit;
  }

  @media ${mobile} {
    padding: 5px;
  }

  @media ${tablet}, ${desktop} {
    width: 295px;
    padding: 8px;
  }
`

const InputErrorStyled = styled.span`
  width: 100%;

  color: ${({ theme }) => theme.colors.error};
`

const ButtonStyled = styled.button`
  padding: 7px;

  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.cream};
  border: none;
  border-radius: 10px;

  @media ${tablet}, ${desktop} {
    width: 213px;
    margin: auto;
  }
`

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      name: '',
      password: '',
    },
    resolver: yupResolver(loginValidationSchema),
  })

  const dispatch = useAppDispatch()

  const handleLogin = handleSubmit((data) => {
    dispatch(login(data))
  })

  const userError = useAppSelector(selectUserError)

  const router = useRouter()

  const { isClient, name } = useUser({
    onUserExists: () => {
      router.push(routes.HOME)
    },
  })

  useEffect(() => {
    return () => {
      dispatch(resetUserState())
    }
  }, [dispatch])

  if (!isClient || name) {
    return <div></div>
  }

  return (
    <main>
      <ContainerStyled>
        <FormStyled onSubmit={handleLogin}>
          <HaderStyled>Authorization</HaderStyled>

          {!!userError?.message && (
            <ErrorStyled>{userError.message}</ErrorStyled>
          )}

          <LabelStyled htmlFor="login">
            login
            <InputStyled type="text" id="login" {...register('name')} />
            {!!errors.name?.message && (
              <InputErrorStyled>{errors.name.message}</InputErrorStyled>
            )}
          </LabelStyled>

          <LabelStyled htmlFor="password">
            password
            <InputStyled
              type="password"
              id="password"
              {...register('password')}
            />
            {!!errors.password?.message && (
              <InputErrorStyled>{errors.password.message}</InputErrorStyled>
            )}
          </LabelStyled>

          <ButtonStyled type="submit">Submit</ButtonStyled>
        </FormStyled>
      </ContainerStyled>
    </main>
  )
}

export default Login
