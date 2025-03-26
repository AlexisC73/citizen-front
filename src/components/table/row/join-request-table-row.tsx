export interface JoinRequestTableRowProps {
  date: string;
  citizenName: string;
  id: string;
}

export function JoinRequestTableRow({
  date,
  citizenName,
}: JoinRequestTableRowProps) {
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
