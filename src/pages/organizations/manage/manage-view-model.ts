import { JoinRequestTableRowProps } from "../../../components/table/row/join-request-table-row";
import { selectJoinOrganizationRequest } from "../../../store/join-organization-request/join-request.slice";
import { selectOrganizations } from "../../../store/organization/organization.slice";
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

export enum RequestStatus {
  EMPTY_REQUESTS,
  MANY_REQUESTS,
}

interface Request {
  status: RequestStatus;
  data: JoinRequestTableRowProps[];
}

export const manageViewModel = (state: RootState): { requests: Request } => {
  const userId = state.auth.user?.id;
  if (!userId) {
    return {
      requests: {
        status: RequestStatus.EMPTY_REQUESTS,
        data: [],
      },
    };
  }

  const joinRequest = selectJoinOrganizationRequest(state);
  const myOrganization = selectOrganizations(state).find(
    (org) => org.owner === userId,
  );

  if (!myOrganization) {
    return {
      requests: {
        status: RequestStatus.EMPTY_REQUESTS,
        data: [],
      },
    };
  }

  const ownOrganizationRequests = joinRequest.filter(
    (req) => req.organizationId === myOrganization.id,
  );

  return {
    requests: {
      status: RequestStatus.MANY_REQUESTS,
      data: ownOrganizationRequests.map((req) => {
        const askDate = new Date(req.askDate);
        const date = `${MONTHS[askDate.getMonth()]} ${askDate.getFullYear()}`;
        return {
          date,
          citizenName: req.citizenName,
          id: req.id,
        };
      }),
    },
  };
};
