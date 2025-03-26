import {
  CreateOrganizationParams,
  OrganizationRepository,
} from "../domain/repository.ts/organization.repository";
import { AuthUser } from "../store/auth/model";

export interface OrganizationApi {
  id: string;
  name: string;
  members: { id: string }[];
  owner: string;
  createdAt: number;
  recruiting: boolean;
}

export class LocalStorageOrganizationRepository
  implements OrganizationRepository
{
  organizations: OrganizationApi[] = this.getLocalOrganizations() ?? [];

  async create(params: CreateOrganizationParams): Promise<void> {
    this.addOrganization({ id: crypto.randomUUID(), name: params.name });
  }

  async getMyOrganizations(): Promise<OrganizationApi[]> {
    const user = this.getAuthUser()!;
    return this.organizations.filter(
      (o) => !o.members.every((m) => m.id !== user.id),
    );
  }

  async getOrganizations(): Promise<OrganizationApi[]> {
    return this.organizations;
  }

  private addOrganization(organization: { id: string; name: string }) {
    const organizations: Map<string, OrganizationApi> = new Map(
      this.organizations.map((o) => [o.id, o]),
    );

    const authUser = this.getAuthUser()!;

    organizations.set(organization.id, {
      id: organization.id,
      name: organization.name,
      members: [{ id: authUser.id }],
      owner: authUser.id,
      createdAt: Date.now(),
      recruiting: true,
    });

    this.setOrganizations(Array.from(organizations.values()));
  }

  private setOrganizations(organizations: OrganizationApi[]) {
    this.organizations = organizations;
    localStorage.setItem("organizations", JSON.stringify(organizations));
  }

  private getLocalOrganizations() {
    return JSON.parse(localStorage.getItem("organizations")!);
  }

  private getAuthUser() {
    const user = localStorage.getItem("authenticatedAs");
    if (!user) {
      throw new Error(
        "You need to use local storage user repository in order to use local storage organization repository.",
      );
    }
    return JSON.parse(user) as AuthUser;
  }
}
