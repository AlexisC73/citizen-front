import { useEffect, useState } from "react";
import { AuthContext, AuthCtx, DEFAULT_USER, User } from "./auth_context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);

  const handleToggleAuth = () => {
    setAuthUser((prev) => {
      if (!prev) {
        localStorage.setItem("user", JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
      } else {
        localStorage.removeItem("user");
        return null;
      }
    });
  };

  const verifyAuthUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthUser(JSON.parse(user));
    }
    setLoading(false);
  };

  const authCtx: AuthContext = {
    user: authUser,
    toggleAuth: handleToggleAuth,
  };

  useEffect(() => {
    verifyAuthUser();
  }, []);

  if (loading) {
    return null;
  }

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
