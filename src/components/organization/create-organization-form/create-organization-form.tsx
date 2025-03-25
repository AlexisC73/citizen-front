import { FormEvent } from "react";

type CreateOrganizationFormProps = {
  onSubmit: ({ name }: { name: string }) => Promise<void>;
};

export function CreateOrganizationForm({
  onSubmit,
}: CreateOrganizationFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    onSubmit({ name }).then(() => form.reset());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-x-3 mx-auto  w-full">
      <label className="floating-label w-full">
        <input
          type="text"
          name="name"
          placeholder="Create your own organization"
          className="input input-md w-full"
        />
        <span>Organization Name</span>
      </label>
      <button className="btn btn-primary">Create</button>
    </form>
  );
}
