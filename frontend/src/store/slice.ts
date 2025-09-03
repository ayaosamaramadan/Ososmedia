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
    },

    logout: (state) => {
      state.isAuthenticated = false
  },
  },
})
export const { loginform,isLogin,logout } = aSlice.actions

export default aSlice.reducer