import {
  CancelJoinOrganizationRequestParams,
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
  citizenName: string;
  askDate: number;
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

  async cancelJoinRequest({
    joinRequestId,
  }: CancelJoinOrganizationRequestParams): Promise<void> {
    const newRequests = [...this.joinRequest];
    const requestIndex = newRequests.findIndex((r) => r.id === joinRequestId);
    if (requestIndex === -1) {
      return;
    }
    newRequests.splice(requestIndex, 1);
    this.setJoinRequests(newRequests);
  }

  async getMyJoinRequests(): Promise<JoinOrganizationRequestApi[]> {
    const user = this.getAuthUser()!;
    return this.joinRequest.filter((r) => r.userId === user.id);
  }

  async getMyOrganizationJoinRequests(): Promise<JoinOrganizationRequestApi[]> {
    const user = this.getAuthUser()!;
    const myOrg = this.organizations.find((o) => o.owner === user.id);
    return this.joinRequest.filter((r) => r.organizationId === myOrg?.id);
  }

  private addRequestToOrganization(organizationId: string, userId: string) {
    const authUser = this.getAuthUser()!;
    const fundRequest = this.joinRequest.find(
      (r) => r.userId === userId && r.organizationId === organizationId,
    );

    if (fundRequest) {
      return { id: fundRequest.id };
    }
    const id = crypto.randomUUID();
    const newRequests = [
      ...this.joinRequest,
      {
        id,
        userId,
        organizationId,
        citizenName: authUser.citizenName,
        askDate: Date.now(),
      },
    ];
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
