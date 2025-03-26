import { selectOrganizations } from "../../../store/organization/organization.slice";
import { OrganizationsListProps } from "./list";
import { RootState, store } from "../../../store/store";
import { JoinOrganizationRequest } from "../../../store/join-organization-request/model";
import { selectJoinOrganizationRequest } from "../../../store/join-organization-request/join-request.slice";
import { createJoinOrganizationRequest } from "../../../store/join-organization-request/usecase/create-request";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export enum ListViewModelStatus {
  EMPTY_ORGANIZATIONS,
  FUND_ORGANIZATIONS,
}

export type OrganizationsReturnTypes =
  | {
      status: ListViewModelStatus.EMPTY_ORGANIZATIONS;
    }
  | {
      status: ListViewModelStatus.FUND_ORGANIZATIONS;
      data: OrganizationsListProps["organizations"];
    };

export const getOrganizationsListPageViewModel = (
  state: RootState,
): {
  hasOwnOrganization: boolean;
  joinRequest: JoinOrganizationRequest[];
  organizations: OrganizationsReturnTypes;
} => {
  const organizations = selectOrganizations(state);
  const joinOrganizationRequest = selectJoinOrganizationRequest(state);

  const handleCreateJoinRequest = async (organizationId: string) => {
    store.dispatch(createJoinOrganizationRequest({ organizationId }));
  };

  const handleCancelJoinRequest = async (organizationId: string) => {
    console.log("should cancel join request", organizationId);
  };

  const myOrganizations = organizations.filter((o) =>
    o.members.some((m) => m.id === state.auth.user?.id),
  );

  const notMemberOrganizations = organizations.filter((o) =>
    o.members.every((m) => m.id !== state.auth.user?.id),
  );

  if (notMemberOrganizations.length === 0) {
    return {
      hasOwnOrganization: myOrganizations ? true : false,
      joinRequest: joinOrganizationRequest,
      organizations: {
        status: ListViewModelStatus.EMPTY_ORGANIZATIONS,
      },
    };
  }
  return {
    hasOwnOrganization: myOrganizations ? true : false,
    joinRequest: joinOrganizationRequest,
    organizations: {
      status: ListViewModelStatus.FUND_ORGANIZATIONS,
      data: notMemberOrganizations.map((o) => {
        const createdAt = new Date(o.createdAt);
        const hasApplied = joinOrganizationRequest.some(
          (j) => j.organizationId === o.id && j.userId === state.auth.user!.id,
        );
        return {
          organizationId: o.id,
          name: o.name,
          members: o.members.length,
          recruiting: o.recruiting,
          hasApplied,
          createdAt: `${MONTHS[createdAt.getMonth()]} ${createdAt.getFullYear()}`,
          onClickAction: hasApplied
            ? () => handleCancelJoinRequest(o.id)
            : o.recruiting
              ? () => handleCreateJoinRequest(o.id)
              : () => console.log("Team is not recruiting"),
        };
      }),
    },
  };
};
