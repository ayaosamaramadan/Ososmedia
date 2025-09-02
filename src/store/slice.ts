import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface theState {
  areYouLoggedIn: boolean
}

const initialState: theState = {
  areYouLoggedIn: true,
}

export const aSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
   changeLoginState: (state) => {
      state.areYouLoggedIn = !state.areYouLoggedIn
    }
  
  },
})
export const { changeLoginState } = aSlice.actions

export default aSlice.reducer