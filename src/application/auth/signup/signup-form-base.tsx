import { SignupUsecaseParams } from "../../../store/auth/usecases/signup.usecase";

interface SignupFormBaseProps {
  signup: (params: SignupUsecaseParams) => Promise<void>;
}

export function SignupFormBase({ signup }: SignupFormBaseProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmationPassword = data.get("confirmation-password") as string;
    const citizenName = data.get("citizen-name") as string;

    signup({ email, password, citizenName, confirmationPassword }).then(() =>
      form.reset(),
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-8 max-w-[520px] mx-auto">
      <fieldset className="fieldset w-full">
        <label htmlFor="email" className="fieldset-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="input w-full mb-4"
          placeholder="Email"
        />

        <label htmlFor="citizen-name" className="fieldset-label">
          Citizen Name
        </label>
        <input
          id="citizen-name"
          name="citizen-name"
          type="text"
          className="input w-full mb-4"
          placeholder="Your Star Citizen name"
        />

        <label htmlFor="password" className="fieldset-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          className="input w-full mb-4"
          placeholder="Enter your password"
        />

        <label htmlFor="confirmation-password" className="fieldset-label">
          Confirmation Password
        </label>
        <input
          id="confirmation-password"
          name="confirmation-password"
          type="password"
          className="input w-full mb-4"
          placeholder="Confirm your password"
        />
        <button type="submit" className="btn btn-neutral mt-4">
          Create Account
        </button>
      </fieldset>
    </form>
  );
}
