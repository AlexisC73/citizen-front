export function CreateOrganizationForm() {
  return (
    <form className="flex gap-x-3 mx-auto  w-full">
      <label className="floating-label w-full">
        <input
          type="text"
          placeholder="Create your own organization"
          className="input input-md w-full"
        />
        <span>Organization Name</span>
      </label>
      <button className="btn btn-primary">Create</button>
    </form>
  );
}
