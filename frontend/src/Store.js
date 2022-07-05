import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./context/LoginContext";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;