import { Link } from "react-router-dom";
import { NoOrganizationCard } from "../components/organization/no-organization-card/no-organization-card";
import { getHomeViewModel } from "./home.viewmodel";
import { store } from "../store/store";

export default function Home() {
  const { ownedOrganization } = getHomeViewModel(store.getState());

  return (
    <div className="w-full flex-1 max-w-[1100px] m-auto px-4 py-8">
      {ownedOrganization ? (
        <>
          <MyOrganizationCard organization={{ name: ownedOrganization.name }} />
          <Link to={"/organizations/list"} className="btn btn-link">
            Join a new Oganization
          </Link>
        </>
      ) : (
        <NoOrganizationCard />
      )}
    </div>
  );
}

function MyOrganizationCard({
  organization,
}: {
  organization: { name: string };
}) {
  return (
    <div>
      <h2>{organization.name}</h2>
      <Link to={`/organizations/manage`} className="btn btn-link">
        Manage
      </Link>
    </div>
  );
}
