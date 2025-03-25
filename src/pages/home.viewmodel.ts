import { createSelector } from "@reduxjs/toolkit";
import {
  selectMyOrganizations,
  selectOwnOrganization,
} from "../store/organization/organization.slice";

export const selectHomeViewModel = createSelector(
  [selectMyOrganizations, selectOwnOrganization],
  (myOrganizations, ownOrganization) => {
    return {
      ownOrganization,
      organizations: myOrganizations,
    };
  },
);
