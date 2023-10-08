import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { reducer: authReducer, actions: authActions } = AuthSlice;
