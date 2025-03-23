export interface OrganizationCardItemProps {
  organizationId: string;
  name: string;
  members: number;
  createdAt: { day: string; month: string; year: string };
  hasApplied: boolean;
  recruiting: boolean;
}

export default function OrganizationCardItem({
  name,
  members,
  createdAt,
  hasApplied,
  recruiting,
}: OrganizationCardItemProps) {
  return (
    <li className="shadow-xl p-4 rounded-xl flex flex-col gap-y-2">
      <div>
        <h2 className="text-lg font-bold flex justify-between items-center">
          {name}
          <span className="text-gray-400 text-sm font-normal">
            Created: {createdAt.month} {createdAt.year}
          </span>
        </h2>
      </div>
      <div id="separator" className="h-px w-full bg-gray-300"></div>
      <div id="card-content" className="flex gap-x-3 h-15 items-center">
        <div className="flex-1 h-full flex flex-col">
          <p className="textarea-sm font-medium text-center">Membres</p>
          <p className="text-primary font-semibold text-2xl h-full flex items-center justify-center">
            {members}
          </p>
        </div>
        <div id="separator" className="w-px h-[40px] bg-gray-300"></div>
        <div className="flex-1 h-full flex flex-col">
          <p className="textarea-sm font-medium text-center">Recruiting</p>
          <p
            className={`font-semibold text-2xl h-full flex items-center justify-center ${recruiting ? "text-green-500" : "text-red-500"}`}
          >
            {recruiting ? "Yes" : "No"}
          </p>
        </div>
        <div id="separator" className="w-px h-[40px] bg-gray-300"></div>
        <div className="flex-1 h-full flex flex-col">
          <p className="textarea-sm font-medium text-center">Langages</p>
          <p className="font-semibold h-full flex items-center justify-center">
            Fr / En
          </p>
        </div>
      </div>
      <button
        className="btn btn-primary w-full"
        disabled={hasApplied ? false : !recruiting}
      >
        {hasApplied ? "Cancel Request" : recruiting ? "Ask to Join" : "Closed"}
      </button>
    </li>
  );
}
