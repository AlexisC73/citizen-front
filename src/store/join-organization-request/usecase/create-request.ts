import { createAppAsyncThunk } from "../../create-app-thunk";

export const createJoinOrganizationRequest = createAppAsyncThunk(
  "joinOrganizationRequest/create",
  async (
    params: CreateJoinOrganizationRequestPayload,
    { getState, extra: { organizationRepository } },
  ) => {
    const user = getState().auth.user!;
    const { id } = await organizationRepository.createJoinRequest({
      organizationId: params.organizationId,
    });

    return {
      id,
      organizationId: params.organizationId,
      userId: user.id,
      citizenName: user.citizenName,
    };
  },
);

export interface CreateJoinOrganizationRequestPayload {
  organizationId: string;
}
