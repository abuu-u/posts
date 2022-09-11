import { createSlice } from '@reduxjs/toolkit'
import { ErrorResponse } from 'shared/lib/api'
import { RootState } from 'shared/lib/store'
import { getPosts, Post } from './posts-api'

export interface PostsState {
  data: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: ErrorResponse
}

const initialState: PostsState = {
  data: [],
  status: 'idle',
}

export const postsSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    resetPostsState: (state) => {
      state.status = 'idle'
      state.error = undefined
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetPostsState } = postsSlice.actions

export const selectPostsStatus = (state: RootState) => state.posts.status
export const selectPostsError = (state: RootState) => state.posts.error
export const selectPosts = (state: RootState) => state.posts.data

const postsReducer = postsSlice.reducer

export default postsReducer
