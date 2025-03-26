import { createSelector, createSlice } from "@reduxjs/toolkit";
import { organizationEntity } from "./entity";
import { getMyOrganizationsUsecase } from "./usecases/get-my-organizations.usecase";
import { RootState } from "../store";
import { getOrganizationsUsecase } from "./usecases/get-organizations.usecase";
import { selectAuth } from "../auth/auth-slice";

export const organizationSlice = createSlice({
  name: "organizations",
  reducers: {},
  initialState: organizationEntity.getInitialState(),
  extraReducers(builder) {
    builder
      .addCase(getMyOrganizationsUsecase.fulfilled, (state, action) => {
        const myOrganizations = action.payload;
        organizationEntity.addMany(
          state,
          myOrganizations.map((o) => ({
            createdAt: o.createdAt,
            id: o.id,
            name: o.name,
            owner: o.owner,
            members: o.members,
            recruiting: o.recruiting,
          })),
        );
      })
      .addCase(getOrganizationsUsecase.fulfilled, (state, action) => {
        const organizations = action.payload;
        organizationEntity.addMany(
          state,
          organizations.map((o) => ({
            id: o.id,
            name: o.name,
            owner: o.owner,
            members: o.members,
            createdAt: o.createdAt,
            recruiting: o.recruiting,
          })),
        );
      });
  },
});

export const selectOrganizations = (state: RootState) =>
  organizationEntity.getSelectors().selectAll(state.organizations);

export const selectMyOrganizations = createSelector(
  [selectOrganizations, (state: RootState) => state.auth.user?.id],
  (orgs, userId) => {
    if (!userId) {
      return [];
    }
    return orgs.filter((o) => o.members.includes({ id: userId }));
  },
);

export const selectOwnOrganization = createSelector(
  [selectOrganizations, (state: RootState) => state.auth.user?.id],
  (orgs, userId) => {
    if (!userId) {
      return undefined;
    }
    return orgs.find((o) => o.owner === userId) ?? undefined;
  },
);

export const selectNotMemberOrganizations = createSelector(
  [selectOrganizations, selectAuth],
  (organizations, auth) => {
    return organizations.filter((o) =>
      o.members.every((m) => m.id !== auth.user?.id),
    );
  },
);
