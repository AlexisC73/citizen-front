import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { organizationSlice } from "./organization/organization.slice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  organizations: organizationSlice.reducer,
});
