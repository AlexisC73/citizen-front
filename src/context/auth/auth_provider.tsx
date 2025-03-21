import { useState } from "react";
import { AuthContext, AuthCtx, User } from "./auth_context";

const DEFAULT_USER = {
  avatarUrl:
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
};

const UNAUTHENTICATED_USER = null;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authUser, setAuthUser] = useState<User | null>(DEFAULT_USER);

  const authCtx: AuthContext = {
    user: authUser,
  };

  const handleToggleAuth = () => {
    setAuthUser((prev) =>
      prev === UNAUTHENTICATED_USER ? DEFAULT_USER : UNAUTHENTICATED_USER,
    );
  };
  return (
    <AuthCtx.Provider value={authCtx}>
      <button
        className="btn btn-primary absolute bottom-4 left-4"
        onClick={handleToggleAuth}
      >
        Toggle Auth
      </button>

      {children}
    </AuthCtx.Provider>
  );
}
