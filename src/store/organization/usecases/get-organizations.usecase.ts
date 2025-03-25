import { createAppAsyncThunk } from "../../create-app-thunk";

export const getMyOrganizationsUsecase = createAppAsyncThunk(
  "organization/getMyOrganizations",
  async (_, { extra: { organizationRepository } }) => {
    const organizations = await organizationRepository.getMyOrganizations();
    return organizations;
  },
);
