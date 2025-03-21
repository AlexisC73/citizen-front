import { Link } from "react-router-dom";

export default function SigninPage() {
  return (
    <form className="w-full px-8 max-w-[520px]">
      <fieldset className="fieldset w-full">
        <label htmlFor="email" className="fieldset-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input w-full mb-4"
          placeholder="Email"
        />

        <label htmlFor="password" className="fieldset-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="input w-full mb-4"
          placeholder="Enter your password"
        />

        <label htmlFor="confirmation-password" className="fieldset-label">
          Confirmation Password
        </label>
        <input
          id="confirmation-password"
          type="password"
          className="input w-full mb-4"
          placeholder="Confirm your password"
        />

        <label htmlFor="citizen-name" className="fieldset-label">
          Password
        </label>
        <input
          id="citizen-name"
          type="text"
          className="input w-full mb-4"
          placeholder="Your Star Citizen name"
        />

        <button className="btn btn-neutral mt-4">Login</button>
        <Link to="/auth/signup" className="btn btn-link mt-4">
          Create an account
        </Link>
      </fieldset>
    </form>
  );
}
