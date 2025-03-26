import { createAppAsyncThunk } from "../../create-app-thunk";

export const getOwnOrganizationJoinRequest = createAppAsyncThunk(
  "joinOrganizationRequest/getOwnOrganizationJoinRequest",
  async (_, { extra: { organizationRepository } }) => {
    const result = await organizationRepository.getMyJoinRequests();
    return result;
  },
);
