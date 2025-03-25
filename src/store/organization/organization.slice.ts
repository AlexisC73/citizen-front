import { createSelector, createSlice } from "@reduxjs/toolkit";
import { organizationEntity } from "./entity";
import { getMyOrganizationsUsecase } from "./usecases/get-organizations.usecase";
import { RootState } from "../store";

export const organizationSlice = createSlice({
  name: "organizations",
  reducers: {},
  initialState: organizationEntity.getInitialState(),
  extraReducers(builder) {
    builder.addCase(getMyOrganizationsUsecase.fulfilled, (state, action) => {
      const myOrganizations = action.payload;
      organizationEntity.addMany(
        state,
        myOrganizations.map((o) => ({
          createdAt: o.createdAt,
          id: o.id,
          name: o.name,
          owner: o.owner,
          members: o.members,
        })),
      );
    });
  },
});

export const selectOrganizations = (state: RootState) =>
  organizationEntity.getSelectors().selectAll(state.organizations);

export const selectMyOrganizations = createSelector(
  [
    (state: RootState) => selectOrganizations(state),
    (state: RootState) => state.auth.user?.id,
  ],
  (orgs, userId) => {
    if (!userId) {
      return [];
    }
    return orgs.filter((o) => o.members.includes({ id: userId }));
  },
);
