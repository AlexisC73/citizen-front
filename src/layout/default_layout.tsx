import { useContext } from "react";
import Header from "../components/header/header";
import { AuthCtx } from "../context/auth/auth_context";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const { user } = useContext(AuthCtx);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header user={user} />
      <Outlet />
    </div>
  );
}
