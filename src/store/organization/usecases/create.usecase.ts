import { createAppAsyncThunk } from "../../create-app-thunk";

export const createOrganizationUsecase = createAppAsyncThunk(
  "organization/create",
  async (
    params: CreateOrganizationUsecaseParams,
    { extra: { organizationRepository } },
  ) => {
    await organizationRepository.create({ name: params.name });
    return;
  },
);

type CreateOrganizationUsecaseParams = {
  name: string;
};
