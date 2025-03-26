import { createSlice } from "@reduxjs/toolkit";
import { organizationEntity } from "./entity";
import { getMyOrganizationsUsecase } from "./usecases/get-my-organizations.usecase";
import { RootState } from "../store";
import { getOrganizationsUsecase } from "./usecases/get-organizations.usecase";

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
