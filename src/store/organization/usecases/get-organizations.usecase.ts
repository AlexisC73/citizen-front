import { createAppAsyncThunk } from "../../create-app-thunk";

export const getOrganizationsUsecase = createAppAsyncThunk(
  "organization/getOrganizations",
  async (_, { extra: { organizationRepository } }) => {
    const organizations = await organizationRepository.getOrganizations();

    return organizations;
  },
);
