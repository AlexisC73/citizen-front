import { Link } from "react-router-dom";
import BoySitting from "../../../assets/boy_sitting";

export function NoOrganizationCard() {
  return (
    <div className="bg-gray-50 p-10 w-full rounded-xl flex items-center justify-center flex-col">
      <h2 className="text-center text-xl font-bold">
        You don't have any Organizations yet.
      </h2>
      <BoySitting className="text-[300px] py-10" />
      <Link to="/organizations/list" className="btn btn-primary">
        Search or Create your organization
      </Link>
    </div>
  );
}
