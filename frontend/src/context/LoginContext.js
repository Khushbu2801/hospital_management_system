import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
  };
  
  const LoginContext = createSlice({
    name: "login",
    initialState,
    reducers: {
      userLoggedin: (state) => {
        state.isLoggedIn = true;
      },
      userLoggedOut: (state) => {
        state.isLoggedIn = false;
      },
    },
  });
  
  export const { userLoggedin, userLoggedOut } = LoginContext.actions;
  export default LoginContext.reducer;