import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginUserData: null,
}

export const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleUserData: (state, action) => {
      state.loginUserData = action.payload
    },
  },
})

export const { handleUserData } = actions

export default reducer
