import { urls } from 'shared/constants/urls'
import { api } from 'shared/lib/api'
import { AppThunk } from 'shared/lib/store'
import { createAppAsyncThunk } from 'shared/lib/thunk'
import { removeName, setName } from 'shared/localstorage/name'
import { userSlice } from './user-store'

export interface LoginRequest {
  name: string
  password: string
}

export interface LoginResponse {
  name: string
}

export const login = createAppAsyncThunk<LoginResponse, LoginRequest>(
  'user/login',
  async (data) => {
    const response = await api.post<LoginResponse>(urls.LOGIN, data)
    setName(response.data.name)
    return response.data
  },
)

export const logout: AppThunk = (dispatch) => {
  dispatch(userSlice.actions.logout())
  removeName()
}
