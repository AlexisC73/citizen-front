import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthCtx } from "../../context/auth/auth_context";

export function RequireAuth({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthCtx);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return children ? children : <Outlet />;
}
