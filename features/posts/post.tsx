import Image from 'next/future/image'
import { ComponentType } from 'react'
import styled from 'styled-components'
import { desktop, mobile, tablet } from 'styles/breakpoints'
import { Post as PostInterface } from './posts-api'

const PostStyled = styled.div`
  display: grid;

  border: 5px solid ${({ theme }) => theme.colors.blueWater};
  border-radius: 6px;

  @media ${mobile} {
    gap: 17px;

    padding: 12px 17px 17px;

    & img {
      display: none;
    }

    & > p:last-child {
      display: none;
    }
  }

  @media ${tablet} {
    gap: 8px;

    width: 325px;

    padding: 25px 25px 40px;
  }

  @media ${desktop} {
    gap: 24px;

    width: 467px;

    padding: 25px 21px 26px;
  }
`

const AuthorStyled = styled.div`
  @media ${desktop} {
    display: flex;

    gap: 30px;

    align-items: start;
  }
`

const AuthorTextStyled = styled.div`
  display: grid;

  @media ${mobile} {
    gap: 17px;
  }

  @media ${tablet} {
    gap: 8px;

    margin-top: 22px;
  }

  @media ${desktop} {
    gap: 11px;
  }
`

const TextStyled = styled.p`
  margin: 0;
`

export const Post: ComponentType<PostInterface> = ({
  img,
  author,
  company,
  title,
  body,
}) => {
  return (
    <PostStyled>
      <AuthorStyled>
        <Image src={img} width="150" height="150" alt={title} unoptimized />

        <AuthorTextStyled>
          <TextStyled>Author: {author}</TextStyled>

          <TextStyled>Company: {company}</TextStyled>
        </AuthorTextStyled>
      </AuthorStyled>

      <TextStyled>Title: {title}</TextStyled>

      <TextStyled>{body}</TextStyled>
    </PostStyled>
  )
}
