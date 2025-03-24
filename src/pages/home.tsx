import { Link } from "react-router-dom";
import { NoOrganizationCard } from "../components/organization/no-organization-card/no-organization-card";

const MY_ORGANIZATION = {
  name: "My Organization",
  description: "This is my organization",
};

export default function Home() {
  return (
    <div className="w-full flex-1 max-w-[1100px] m-auto px-4 py-8">
      {MY_ORGANIZATION ? (
        <>
          <MyOrganizationCard />
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

function MyOrganizationCard() {
  return (
    <div>
      <h2>{MY_ORGANIZATION.name}</h2>
      <p>{MY_ORGANIZATION.description}</p>
      <Link to={`/organizations/manage`} className="btn btn-link">
        Manage
      </Link>
    </div>
  );
}
