import { OrganizationApi } from "../../infrastructures/local-storage-organization.repository";

export interface OrganizationRepository {
  create(params: CreateOrganizationParams): Promise<void>;
  getMyOrganizations(): Promise<OrganizationApi[]>;
  getOrganizations(): Promise<OrganizationApi[]>;
  createJoinRequest({
    organizationId,
  }: CreateJoinOrganizationRequestParams): Promise<{ id: string }>;
}

export interface CreateOrganizationParams {
  name: string;
}

export interface CreateJoinOrganizationRequestParams {
  organizationId: string;
}
