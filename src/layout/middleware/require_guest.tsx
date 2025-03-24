import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { selectAuth } from "../../store/auth/auth-slice";

export function RequireGuest({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return children ? children : <Outlet />;
}
