import { Link } from "react-router-dom";
import { NoOrganizationCard } from "../components/organization/no-organization-card/no-organization-card";
import { useAppSelector } from "../store/store";
import { selectOrganizations } from "../store/organization/organization.slice";
import { selectAuth } from "../store/auth/auth-slice";

export default function Home() {
  const { user } = useAppSelector(selectAuth);
  const myOrganizations = useAppSelector(selectOrganizations);
  console.log(myOrganizations);
  const ownOrganization = myOrganizations.find((o) => o.owner === user!.id);

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
