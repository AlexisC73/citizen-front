import { Link } from "react-router-dom";
import { NoOrganizationCard } from "../components/organization/no-organization-card/no-organization-card";
import { useAppSelector } from "../store/store";
import { selectHomeViewModel } from "./home.viewmodel";

export default function Home() {
  const { ownOrganization } = useAppSelector(selectHomeViewModel);

  return (
    <div className="w-full flex-1 max-w-[1100px] m-auto px-4 py-8">
      {ownOrganization ? (
        <>
          <MyOrganizationCard organization={{ name: ownOrganization.name }} />
          <Link to={"/organizations/list"} className="btn btn-link">
            Search for new Oganization
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
