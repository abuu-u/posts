import axios, { AxiosError, AxiosInterceptorOptions } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginRequest } from 'features/user/user-api'
import { BASE_URL, JSONPLACEHOLDER_BASE_URL, urls } from '../constants/urls'

export interface ErrorResponse {
  message: string
  status: number
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
})

const mock = new MockAdapter(api, { delayResponse: 500 })

const mockUser = {
  name: 'username',
  password: 'password',
}

mock.onPost(urls.LOGIN).reply((config) => {
  if (!config.data) {
    return [400, { message: 'Bad request' }]
  }

  const { name, password } = JSON.parse(config.data) as Partial<LoginRequest>

  if (!name || !password) {
    return [400, { message: 'Bad request' }]
  }

  if (mockUser.name !== name || mockUser.password !== password) {
    return [400, { message: 'Invalid login or password' }]
  }

  return [200, { name }]
})

export const jsonplaceholderApi = axios.create({
  baseURL: JSONPLACEHOLDER_BASE_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
})

const errorHandlerInterceptor: [
  onFulfilled?: (value: any) => any | Promise<any>,
  onRejected?: (error: any) => any,
  options?: AxiosInterceptorOptions,
] = [
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>
      let message = 'unexpected error'
      let status = 500

      if (axiosError.response?.data.message) {
        message = axiosError.response.data.message
        status = axiosError.response.status
      }

      throw {
        message,
        status,
      } as ErrorResponse
    }
  },
]

api.interceptors.response.use(...errorHandlerInterceptor)
jsonplaceholderApi.interceptors.response.use(...errorHandlerInterceptor)
