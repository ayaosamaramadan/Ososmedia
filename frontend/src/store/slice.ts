import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface theState {
  areYouLoggedIn: boolean;
  isAuthenticated: boolean;
}

const initialState: theState = {
  areYouLoggedIn: true,
  isAuthenticated: false,
}

export const aSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
   loginform: (state) => {
      state.areYouLoggedIn = !state.areYouLoggedIn
    }
    ,
    isLogin: (state, action) => {
      state.isAuthenticated = action.payload
    }
  },
})
export const { loginform,isLogin } = aSlice.actions

export default aSlice.reducer