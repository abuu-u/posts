import { Post } from 'features/posts/post'
import { getPosts } from 'features/posts/posts-api'
import { selectPosts } from 'features/posts/posts-store'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { routes } from 'shared/constants/routes'
import { useUser } from 'shared/hooks/use-user'
import { useAppDispatch, useAppSelector } from 'shared/lib/store'
import styled from 'styled-components'
import { desktop, mobile, tablet } from 'styles/breakpoints'
import { container } from 'styles/container'

const MainStyled = styled.main`
  ${container}

  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  @media ${mobile} {
    flex-direction: column;

    gap: 10px;

    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media ${tablet} {
    gap: 25px 20px;

    padding-top: 25px;
    padding-bottom: 25px;
  }

  @media ${desktop} {
    gap: 20px 13px;

    padding-top: 20px;
    padding-bottom: 20px;
  }
`

const Home: NextPage = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const posts = useAppSelector(selectPosts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const { name, isClient } = useUser({
    onUserNotExists: () => {
      router.push(routes.LOGIN)
    },
  })

  if (!isClient || !name) {
    return <div></div>
  }

  return (
    <MainStyled>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </MainStyled>
  )
}

export default Home
