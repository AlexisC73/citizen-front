import { createSlice } from "@reduxjs/toolkit";
import { getAuthAsyncThunk } from "./usecases/get-auth.usecase";

export interface AuthState {
  user: {
    id: string;
    avatarUrl: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuthAsyncThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectAuth = (state: { auth: AuthState }) => state.auth;
