import {
  AnyAction,
  AsyncThunkOptions,
  AsyncThunkPayloadCreatorReturnValue,
  createAsyncThunk,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { FallbackIfUnknown } from '@reduxjs/toolkit/dist/tsHelpers'
import { ErrorResponse } from './api'
import { AppDispatch, RootState } from './store'

interface AppThunkApiConfig {
  rejectValue: ErrorResponse
  state: RootState
  dispatch: AppDispatch
}

type GetState<ThunkApiConfig> = ThunkApiConfig extends {
  state: infer State
}
  ? State
  : unknown
type GetExtra<ThunkApiConfig> = ThunkApiConfig extends {
  extra: infer Extra
}
  ? Extra
  : unknown
type GetDispatch<ThunkApiConfig> = ThunkApiConfig extends {
  dispatch: infer Dispatch
}
  ? FallbackIfUnknown<
      Dispatch,
      ThunkDispatch<
        GetState<ThunkApiConfig>,
        GetExtra<ThunkApiConfig>,
        AnyAction
      >
    >
  : ThunkDispatch<GetState<ThunkApiConfig>, GetExtra<ThunkApiConfig>, AnyAction>

type GetRejectValue<ThunkApiConfig> = ThunkApiConfig extends {
  rejectValue: infer RejectValue
}
  ? RejectValue
  : unknown
type GetFulfilledMeta<ThunkApiConfig> = ThunkApiConfig extends {
  fulfilledMeta: infer FulfilledMeta
}
  ? FulfilledMeta
  : unknown
type GetRejectedMeta<ThunkApiConfig> = ThunkApiConfig extends {
  rejectedMeta: infer RejectedMeta
}
  ? RejectedMeta
  : unknown

type GetThunkAPI<ThunkApiConfig> = BaseThunkAPI<
  GetState<ThunkApiConfig>,
  GetExtra<ThunkApiConfig>,
  GetDispatch<ThunkApiConfig>,
  GetRejectValue<ThunkApiConfig>,
  GetRejectedMeta<ThunkApiConfig>,
  GetFulfilledMeta<ThunkApiConfig>
>

export const createAppAsyncThunk = <Returned, ThunkArgument>(
  typePrefix: string,
  callback: (
    argument: ThunkArgument,
    thunkAPI: GetThunkAPI<AppThunkApiConfig>,
  ) => AsyncThunkPayloadCreatorReturnValue<
    Promise<Returned>,
    AppThunkApiConfig
  >,
  options?: AsyncThunkOptions<ThunkArgument, AppThunkApiConfig>,
) =>
  createAsyncThunk<Returned, ThunkArgument, AppThunkApiConfig>(
    typePrefix,
    async (data, thunkAPI) => {
      try {
        return await callback(data, thunkAPI)
      } catch (error) {
        return thunkAPI.rejectWithValue(error as ErrorResponse)
      }
    },
    options,
  )
