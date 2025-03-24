import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectAuth } from "../../store/auth/auth-slice";

export function RequireAuth({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return children ? children : <Outlet />;
}
