import { Link } from "react-router-dom";

export function SigninPage() {
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

        <button
          onClick={() => console.log("should signin")}
          className="btn btn-neutral mt-4"
        >
          Login
        </button>
        <Link to="/auth/signup" className="btn btn-link mt-4">
          Create an account
        </Link>
      </fieldset>
    </form>
  );
}
