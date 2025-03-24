interface SigninFormBaseProps {
  signin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
}

export function SigninFormBase({ signin }: SigninFormBaseProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    signin({ email, password }).then(() => form.reset());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-8 max-w-[520px] mx-auto">
      <fieldset className="fieldset w-full">
        <label htmlFor="email" className="fieldset-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="input w-full mb-4"
          placeholder="Email"
          required
        />

        <label htmlFor="password" className="fieldset-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="input w-full mb-4"
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
      </fieldset>
    </form>
  );
}
