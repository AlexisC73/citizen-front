import { Link } from "react-router-dom";
import { SigninForm } from "../../application/auth/signin/signin-form";

export function SigninPage() {
  return (
    <main className="flex flex-col w-full flex-1">
      <SigninForm />
      <Link to="/auth/signup" className="btn btn-link mt-4">
        Create an account
      </Link>
    </main>
  );
}
