import { Link } from "react-router-dom";
import { SignupForm } from "../../application/auth/signup/signup-form";

export function SignupPage() {
  return (
    <main className="flex flex-col w-full flex-1">
      <SignupForm />
      <Link to="/auth" className="btn btn-link mt-4">
        Already have an account? Sign in
      </Link>
    </main>
  );
}
