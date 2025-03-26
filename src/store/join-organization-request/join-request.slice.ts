import { createSlice } from "@reduxjs/toolkit";
import { joinOrganizationRequestEntity } from "./entity";
import { createJoinOrganizationRequest } from "./usecase/create-request";
import { RootState } from "../store";
import { cancelJoinOrganizationRequest } from "./usecase/cancel-request.usecase";
import { getOwnJoinRequests } from "./usecase/get-own-join-request.usecase";
import { getOwnOrganizationJoinRequest } from "./usecase/get-orwn-organization-join-request.usecase";

export const joinOrganizationRequest = createSlice({
  name: "joinOrganizationRequest",
  initialState: joinOrganizationRequestEntity.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createJoinOrganizationRequest.fulfilled, (state, action) => {
        joinOrganizationRequestEntity.addOne(state, {
          id: action.payload.id,
          organizationId: action.payload.organizationId,
          userId: action.payload.userId,
          citizenName: "Test",
          askDate: Date.now(),
        });
      })
      .addCase(cancelJoinOrganizationRequest.fulfilled, (state, action) => {
        joinOrganizationRequestEntity.removeOne(
          state,
          action.payload.joinRequestId,
        );
      })
      .addCase(getOwnJoinRequests.fulfilled, (state, action) => {
        joinOrganizationRequestEntity.addMany(
          state,
          action.payload.map((r) => ({
            id: r.id,
            organizationId: r.organizationId,
            userId: r.userId,
            citizenName: r.citizenName,
            askDate: r.askDate,
          })),
        );
      })
      .addCase(getOwnOrganizationJoinRequest.fulfilled, (state, action) => {
        joinOrganizationRequestEntity.addMany(
          state,
          action.payload.map((r) => ({
            id: r.id,
            organizationId: r.organizationId,
            userId: r.userId,
            citizenName: r.citizenName,
            askDate: r.askDate,
          })),
        );
      });
  },
});

export const selectJoinOrganizationRequest = (state: RootState) =>
  joinOrganizationRequestEntity
    .getSelectors()
    .selectAll(state.joinOrganizationRequest);
