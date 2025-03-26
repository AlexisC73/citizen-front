import { createAppAsyncThunk } from "../../create-app-thunk";

export const getOwnJoinRequests = createAppAsyncThunk(
  "joinOrganizationRequest/getOwnJoinRequests",
  async (_, { extra: { organizationRepository } }) => {
    const requests = await organizationRepository.getMyJoinRequests();
    return requests;
  },
);
