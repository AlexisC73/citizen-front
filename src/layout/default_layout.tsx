import { useContext } from "react";
import Header from "../components/header/header";
import { AuthCtx } from "../context/auth/auth_context";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const { user } = useContext(AuthCtx);
  return (
    <div>
      <Header user={user} />
      <Outlet />
    </div>
  );
}
