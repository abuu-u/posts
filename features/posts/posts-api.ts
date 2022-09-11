import { urls } from 'shared/constants/urls'
import { jsonplaceholderApi } from 'shared/lib/api'
import { createAppAsyncThunk } from 'shared/lib/thunk'

export interface Post {
  id: number
  title: string
  author: string
  company: string
  body: string
  img: string
}

interface PostResponse {
  userId: number
  id: number
  title: string
  body: string
}

interface UsersResponse {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface PhotosResponse {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export const getPosts = createAppAsyncThunk<Post[], void>(
  'posts/get',
  async () => {
    const [{ data: posts }, { data: users }, { data: photos }] =
      await Promise.all([
        jsonplaceholderApi.get<PostResponse[]>(urls.POSTS),
        jsonplaceholderApi.get<UsersResponse[]>(urls.USERS),
        jsonplaceholderApi.get<PhotosResponse[]>(urls.PHOTOS),
      ])

    const usersWithImg = users
      .map(({ id, name, company }) => {
        const userPhoto = photos.find(({ albumId }) => id === albumId)

        return {
          id,
          img: userPhoto!.thumbnailUrl,
          name,
          company: company.name,
        }
      })
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce(
        (object, { id, img, company, name }) => {
          object[id] = {
            img,
            name,
            company,
          }
          return object
        },
        {} as Record<
          number,
          {
            img: string
            name: string
            company: string
          }
        >,
      )

    return posts.map(({ body, id, title, userId }) => {
      const { name, company, img } = usersWithImg[userId]

      return {
        author: name,
        body,
        company,
        id,
        img,
        title,
      }
    })
  },
)
