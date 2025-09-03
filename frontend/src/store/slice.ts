import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface theState {
  areYouLoggedIn: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

// Get initial state from localStorage
const getInitialState = (): theState => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("authToken");

  return {
    areYouLoggedIn: true,
    isAuthenticated: !!storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
  };
};

const initialState: theState = getInitialState();

export const aSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    loginform: (state) => {
      state.areYouLoggedIn = !state.areYouLoggedIn;
    },
    isLogin: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;

      // Store in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    },
  },
});

export const { loginform, isLogin, logout, loginSuccess } = aSlice.actions;

export default aSlice.reducer;
