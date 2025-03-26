import { selectOrganizations } from "../../../store/organization/organization.slice";
import { OrganizationsListProps } from "./list";
import { RootState } from "../../../store/store";

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
  organizations: OrganizationsReturnTypes;
} => {
  const organizations = selectOrganizations(state);

  const myOrganizations = organizations.filter((o) =>
    o.members.some((m) => m.id === state.auth.user?.id),
  );

  const notMemberOrganizations = organizations.filter((o) =>
    o.members.every((m) => m.id !== state.auth.user?.id),
  );

  if (notMemberOrganizations.length === 0) {
    return {
      hasOwnOrganization: myOrganizations ? true : false,
      organizations: {
        status: ListViewModelStatus.EMPTY_ORGANIZATIONS,
      },
    };
  }
  return {
    hasOwnOrganization: myOrganizations ? true : false,
    organizations: {
      status: ListViewModelStatus.FUND_ORGANIZATIONS,
      data: notMemberOrganizations.map((o) => {
        const createdAt = new Date(o.createdAt);
        return {
          id: o.id,
          name: o.name,
          members: o.members.length,
          recruiting: o.recruiting,
          createdAt: `${MONTHS[createdAt.getMonth()]} ${createdAt.getFullYear()}`,
        };
      }),
    },
  };
};
