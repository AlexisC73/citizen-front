import { createAppAsyncThunk } from "../../create-app-thunk";

export const cancelJoinOrganizationRequest = createAppAsyncThunk(
  "joinOrganizationRequest/cancel",
  async (
    { joinRequestId }: { joinRequestId: string },
    { extra: { organizationRepository } },
  ) => {
    await organizationRepository.cancelJoinRequest({
      joinRequestId,
    });
    return { joinRequestId };
  },
);
