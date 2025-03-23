import OrganizationCardItem from "../../components/organization/card-item/card-item";

export default function OrganizationsListPage() {
  return (
    <div className="w-full max-w-[1100px] mx-auto">
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
