import { useNavigate } from "react-router-dom";
import OrganizationCardItem from "../../../components/organization/card-item/card-item";
import { CreateOrganizationForm } from "../../../components/organization/create-organization-form/create-organization-form";
import { createOrganizationUsecase } from "../../../store/organization/usecases/create.usecase";
import { store, useAppDispatch } from "../../../store/store";
import {
  getOrganizationsListPageViewModel,
  ListViewModelStatus,
} from "./list.viewmodel";

export default function OrganizationsListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { hasOwnOrganization, organizations } =
    getOrganizationsListPageViewModel(store.getState());

  const ModelView = () => {
    switch (organizations.status) {
      case ListViewModelStatus.EMPTY_ORGANIZATIONS:
        return <p>No organizations found</p>;
      case ListViewModelStatus.FUND_ORGANIZATIONS:
        return <OrganizationsList organizations={organizations.data} />;
      default:
        return null;
    }
  };

  const handleCreateOrganization = async ({ name }: { name: string }) => {
    dispatch(
      createOrganizationUsecase({
        name,
      }),
    ).then(() => navigate("/"));
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div hidden={hasOwnOrganization} className="p-8">
        <CreateOrganizationForm onSubmit={handleCreateOrganization} />
      </div>
      <ModelView />
    </div>
  );
}

export interface OrganizationsListProps {
  organizations: {
    id: string;
    name: string;
    members: number;
    recruiting: boolean;
    createdAt: string;
  }[];
}

function OrganizationsList({ organizations }: OrganizationsListProps) {
  return (
    <ul className="mt-4 md:grid md:grid-cols-2 gap-4">
      {organizations.map((o) => (
        <OrganizationCardItem
          key={o.id}
          organizationId={o.id}
          name={o.name}
          members={o.members}
          recruiting={o.recruiting}
          createdAt={o.createdAt}
          hasApplied={false}
        />
      ))}
    </ul>
  );
}
