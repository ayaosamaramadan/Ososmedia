import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  friends?: string[];
}

export interface theState {
  areYouLoggedIn: boolean;
  isAuthenticated: boolean;
  user: User | null;
  friends?: string[];
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

    addFriend: (state, action: PayloadAction<string>) => {
      if (state.user) {
        if (!state.user.friends) {
          state.user.friends = [];
        }
        if (!state.user.friends.includes(action.payload)) {
          state.user.friends.push(action.payload);

          // Update localStorage
          localStorage.setItem("user", JSON.stringify(state.user));
          console.log("Friend added successfully! Friend ID:", action.payload);
          console.log("Total friends:", state.user.friends.length);
        } else {
          console.log("User is already a friend!");
        }
      }
    },

   
  },
});

export const {
  loginform,
  isLogin,
  logout,
  loginSuccess,
  addFriend,
  
} = aSlice.actions;

export default aSlice.reducer;
