import { createSlice } from '@reduxjs/toolkit'

export const logdinSlice = createSlice({
  name: 'logdin',
  initialState: {
    value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  },
  reducers: {
    whoLogdin: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = action.payload
      console.log(action);
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { whoLogdin } = logdinSlice.actions

export default logdinSlice.reducer