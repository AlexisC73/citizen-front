import { OrganizationApi } from "../../infrastructures/local-storage-organization.repository";

export interface OrganizationRepository {
  create(params: CreateOrganizationParams): Promise<void>;
  getMyOrganizations(): Promise<OrganizationApi[]>;
  getOrganizations(): Promise<OrganizationApi[]>;
}

export interface CreateOrganizationParams {
  name: string;
}
