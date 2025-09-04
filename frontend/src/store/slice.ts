import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  profilePicture: string;
  friends?: string[];
}

export interface theState {
  areYouLoggedIn: boolean;
  isAuthenticated: boolean;
  user: User | null;
  friends?: string[];
}

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
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    },

    addFriend: (state, action: PayloadAction<string>) => {
      if (state.user) {
        if (!state.user.friends) {
          state.user.friends = [];
        }
        if (!state.user.friends.includes(action.payload)) {
          state.user.friends.push(action.payload);

          localStorage.setItem("user", JSON.stringify(state.user));
          console.log("Friend added successfully! Friend ID:", action.payload);
          console.log("Total friends:", state.user.friends.length);
        } else {
          console.log("User is already a friend!");
        }
      }
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { loginform, isLogin, logout, loginSuccess, addFriend, setUser } =
  aSlice.actions;

export default aSlice.reducer;
