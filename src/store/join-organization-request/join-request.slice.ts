import { createSlice } from "@reduxjs/toolkit";
import { joinOrganizationRequestEntity } from "./entity";
import { createJoinOrganizationRequest } from "./usecase/create-request";
import { RootState } from "../store";

export const joinOrganizationRequest = createSlice({
  name: "joinOrganizationRequest",
  initialState: joinOrganizationRequestEntity.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      createJoinOrganizationRequest.fulfilled,
      (state, action) => {
        joinOrganizationRequestEntity.addOne(state, {
          id: action.payload.id,
          organizationId: action.payload.organizationId,
          userId: action.payload.userId,
        });
      },
    );
  },
});

export const selectJoinOrganizationRequest = (state: RootState) =>
  joinOrganizationRequestEntity
    .getSelectors()
    .selectAll(state.joinOrganizationRequest);
