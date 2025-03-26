import { Link } from "react-router-dom";
import { NoOrganizationCard } from "../components/organization/no-organization-card/no-organization-card";
import { getHomeViewModel } from "./home.viewmodel";
import { useAppSelector } from "../store/store";

export default function Home() {
  const { ownedOrganization } = useAppSelector(getHomeViewModel);

  return (
    <div className="w-full flex-1 max-w-[1100px] m-auto px-4 py-8">
      {ownedOrganization ? (
        <>
          <MyOrganizationCard
            organization={{
              name: ownedOrganization.name,
              members: ownedOrganization.members.length,
            }}
          />
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
  organization: { name: string; members: number };
}) {
  return (
    <div>
      <h2>
        {organization.name}{" "}
        <span className="text-sm">({organization.members} membres)</span>
      </h2>
      <Link to={`/organizations/manage`} className="btn btn-link">
        Manage
      </Link>
    </div>
  );
}
