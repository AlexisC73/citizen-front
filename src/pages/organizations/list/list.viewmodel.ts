import { selectOrganizations } from "../../../store/organization/organization.slice";
import { OrganizationsListProps } from "./list";
import { RootState, store } from "../../../store/store";
import { JoinOrganizationRequest } from "../../../store/join-organization-request/model";
import { selectJoinOrganizationRequest } from "../../../store/join-organization-request/join-request.slice";
import { createJoinOrganizationRequest } from "../../../store/join-organization-request/usecase/create-request";
import { cancelJoinOrganizationRequest } from "../../../store/join-organization-request/usecase/cancel-request.usecase";

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
  const userId = state.auth.user?.id;

  if (!userId) {
    return {
      hasOwnOrganization: false,
      joinRequest: [],
      organizations: {
        status: ListViewModelStatus.EMPTY_ORGANIZATIONS,
      },
    };
  }

  const handleCreateJoinRequest = async (organizationId: string) => {
    store.dispatch(createJoinOrganizationRequest({ organizationId }));
  };

  const handleCancelJoinRequest = async (joinRequestId: string) => {
    store.dispatch(cancelJoinOrganizationRequest({ joinRequestId }));
  };

  const myOrganizations = organizations.filter((o) =>
    o.members.some((m) => m.id === userId),
  );

  const notMemberOrganizations = organizations.filter((o) =>
    o.members.every((m) => m.id !== userId),
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
          (j) => j.organizationId === o.id && j.userId === userId,
        );
        const joinRequestId = joinOrganizationRequest.find(
          (j) => j.organizationId === o.id && j.userId === userId,
        )?.id;
        return {
          organizationId: o.id,
          name: o.name,
          members: o.members.length,
          recruiting: o.recruiting,
          hasApplied,
          createdAt: `${MONTHS[createdAt.getMonth()]} ${createdAt.getFullYear()}`,
          onClickAction: hasApplied
            ? () => handleCancelJoinRequest(joinRequestId!)
            : o.recruiting
              ? () => handleCreateJoinRequest(o.id)
              : () => console.log("Team is not recruiting"),
        };
      }),
    },
  };
};
