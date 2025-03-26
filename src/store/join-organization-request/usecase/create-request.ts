import { createAppAsyncThunk } from "../../create-app-thunk";

export const createJoinOrganizationRequest = createAppAsyncThunk(
  "joinOrganizationRequest/create",
  async (
    params: CreateJoinOrganizationRequestPayload,
    { getState, extra: { organizationRepository } },
  ) => {
    const userId = getState().auth.user!.id;
    const { id } = await organizationRepository.createJoinRequest({
      organizationId: params.organizationId,
    });

    return { id, organizationId: params.organizationId, userId };
  },
);

export interface CreateJoinOrganizationRequestPayload {
  organizationId: string;
}
