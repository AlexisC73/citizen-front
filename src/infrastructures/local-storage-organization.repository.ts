import {
  CreateJoinOrganizationRequestParams,
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

export interface JoinOrganizationRequestApi {
  id: string;
  userId: string;
  organizationId: string;
}

export class LocalStorageOrganizationRepository
  implements OrganizationRepository
{
  organizations: OrganizationApi[] = this.getLocalOrganizations() ?? [];
  joinRequest: JoinOrganizationRequestApi[] = this.getLocalJoinRequests() ?? [];

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

  async createJoinRequest({
    organizationId,
  }: CreateJoinOrganizationRequestParams): Promise<{ id: string }> {
    const user = this.getAuthUser()!;
    const { id } = this.addRequestToOrganization(organizationId, user.id);
    return { id };
  }

  private addRequestToOrganization(organizationId: string, userId: string) {
    const fundRequest = this.joinRequest.find(
      (r) => r.userId === userId && r.organizationId === organizationId,
    );

    if (fundRequest) {
      return { id: fundRequest.id };
    }
    const id = crypto.randomUUID();
    const newRequests = [...this.joinRequest, { id, userId, organizationId }];
    this.setJoinRequests(newRequests);
    return { id };
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

  private setJoinRequests(requests: JoinOrganizationRequestApi[]) {
    this.joinRequest = requests;
    localStorage.setItem("joinRequest", JSON.stringify(requests));
  }

  private getLocalOrganizations() {
    return JSON.parse(localStorage.getItem("organizations")!);
  }

  private getLocalJoinRequests() {
    return JSON.parse(localStorage.getItem("joinRequest")!);
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
