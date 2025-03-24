const ASK_JOIN: { date: string; citizenName: string }[] = [
  {
    date: "23 Jan 2021",
    citizenName: "John Doe",
  },
  {
    date: "22 Apr 2023",
    citizenName: "Jane Doe",
  },
];

export function ManageOrganizationPage() {
  return (
    <>
      <div className="stats shadow mx-auto m-8">
        <div className="stat">
          <div className="stat-title">Total Request</div>
          <div className="stat-value">{ASK_JOIN.length}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
      <div className="max-w-[1100px] w-full mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ASK_JOIN.map((ask) => (
              <JoinRequestTableRow
                citizenName={ask.citizenName}
                date={ask.date}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function JoinRequestTableRow({
  date,
  citizenName,
}: {
  date: string;
  citizenName: string;
}) {
  return (
    <tr>
      <th>{date}</th>
      <td>{citizenName}</td>
      <td className="flex gap-x-3">
        <button className="btn btn-primary">Accepter</button>
        <button className="btn btn-warning">Refuser</button>
      </td>
    </tr>
  );
}
