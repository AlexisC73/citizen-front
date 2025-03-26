import { selectOrganizations } from "../store/organization/organization.slice";
import { RootState } from "../store/store";

export const getHomeViewModel = (state: RootState) => {
  const organizations = selectOrganizations(state);
  const userId = state.auth.user?.id;

  if (!userId) {
    return {
      myOrganizations: [],
      ownedOrganization: undefined,
    };
  }

  const myOrganizations = organizations.filter(
    (o) =>
      o.members.some((m) => m.id === state.auth.user?.id) &&
      o.owner !== state.auth.user?.id,
  );

  const ownedOrganization = organizations.find(
    (o) => o.owner === state.auth.user?.id,
  );

  return {
    myOrganizations,
    ownedOrganization,
  };
};
