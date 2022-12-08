import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  adminData: []
}

export const { actions, reducer } = createSlice({
  name: "admin",
  initialState,
  reducers: {
    handleAdminData: (state, action) => {
      console.log(state, '===', action);
    },
  }
})

export const { handleAdminData } = actions

export default reducer