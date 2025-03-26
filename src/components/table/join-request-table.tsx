export function JoinRequestTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
