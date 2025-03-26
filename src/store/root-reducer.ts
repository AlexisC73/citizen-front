import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { organizationSlice } from "./organization/organization.slice";
import { joinOrganizationRequest } from "./join-organization-request/join-request.slice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  organizations: organizationSlice.reducer,
  joinOrganizationRequest: joinOrganizationRequest.reducer,
});
