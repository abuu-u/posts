import { createSlice } from '@reduxjs/toolkit'
import { ErrorResponse } from 'shared/lib/api'
import { RootState } from 'shared/lib/store'
import { getName } from 'shared/localstorage/name'
import { getLocalStorageItemIfInBrowser } from 'shared/localstorage/utils'
import { login } from './user-api'

export interface UserState {
  name?: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: ErrorResponse
}

const initialState: UserState = {
  name: getLocalStorageItemIfInBrowser(getName),
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    resetUserState: (state) => {
      state.status = 'idle'
      state.error = undefined
    },

    logout: (state) => {
      state.status = 'idle'
      state.error = undefined
      state.name = undefined
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.name = action.payload.name
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetUserState } = userSlice.actions

export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserError = (state: RootState) => state.user.error
export const selectName = (state: RootState) => state.user.name

const userReducer = userSlice.reducer

export default userReducer
