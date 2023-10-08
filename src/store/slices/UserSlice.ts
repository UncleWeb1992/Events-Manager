import { IUser } from "@/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {} as IUser,
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { reducer: userReducer, actions: userActions } = AuthSlice;
