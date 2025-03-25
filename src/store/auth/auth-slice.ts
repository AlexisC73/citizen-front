import { createSlice } from "@reduxjs/toolkit";
import { getAuthAsyncThunk } from "./usecases/get-auth.usecase";
import { signinUsecase } from "./usecases/signin.usecase";
import { signoutUsecase } from "./usecases/signout.usecase";
import { AuthUser } from "./model";

export interface AuthState {
  user: AuthUser;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthAsyncThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signinUsecase.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signoutUsecase.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
