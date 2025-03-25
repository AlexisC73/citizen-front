import OrganizationCardItem from "../../components/organization/card-item/card-item";
import { CreateOrganizationForm } from "../../components/organization/create-organization-form/create-organization-form";
import { createOrganizationUsecase } from "../../store/organization/usecases/create.usecase";
import { useAppDispatch } from "../../store/store";

export default function OrganizationsListPage() {
  const dispatch = useAppDispatch();

  const handleCreateOrganization = async ({ name }: { name: string }) => {
    dispatch(
      createOrganizationUsecase({
        name,
      }),
    ).then(() => alert("Organization created!"));
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto">
      <div className="p-8">
        <CreateOrganizationForm onSubmit={handleCreateOrganization} />
      </div>
      <OrganizationsList />
    </div>
  );
}

function OrganizationsList() {
  return (
    <ul className="mt-4 md:grid md:grid-cols-2 gap-4">
      <OrganizationCardItem
        organizationId="1"
        createdAt={{
          day: "21",
          month: "Jun",
          year: "2021",
        }}
        hasApplied={true}
        name="Test Organization"
        members={10}
        recruiting={true}
      />
    </ul>
  );
}
