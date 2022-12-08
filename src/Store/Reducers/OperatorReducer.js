import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  operatorData: []
}

export const { actions, reducer } = createSlice({
  name: "operator",
  initialState,
  reducers: {
    handleOperatorData: (state, action) => {
      console.log(state, '===', action);
    },
  }
})

export const { handleOperatorData } = actions

export default reducer