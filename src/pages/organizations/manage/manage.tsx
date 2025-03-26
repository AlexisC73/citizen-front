import { JoinRequestTable } from "../../../components/table/join-request-table";
import { JoinRequestTableRow } from "../../../components/table/row/join-request-table-row";
import { useAppSelector } from "../../../store/store";
import { manageViewModel, RequestStatus } from "./manage-view-model";

export function ManageOrganizationPage() {
  const { requests } = useAppSelector(manageViewModel);

  const ModelView = () => {
    switch (requests.status) {
      case RequestStatus.EMPTY_REQUESTS:
        return <div>No requests</div>;
      case RequestStatus.MANY_REQUESTS:
        return (
          <JoinRequestTable>
            {requests.data.map((r) => (
              <JoinRequestTableRow
                key={r.id}
                citizenName={r.citizenName}
                date={r.date}
                id={r.id}
              />
            ))}
          </JoinRequestTable>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <div className="stats shadow mx-auto m-8">
        <div className="stat">
          <div className="stat-title">Total Request</div>
          <div className="stat-value">{requests?.data.length ?? 0}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
      <div className="max-w-[1100px] w-full mx-auto">
        <ModelView />
      </div>
    </>
  );
}
