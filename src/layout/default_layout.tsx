import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { selectAuth } from "../store/auth/auth-slice";

export default function DefaultLayout() {
  const { user } = useAppSelector(selectAuth);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header authenticatedUser={user} />
      <Outlet />
    </div>
  );
}
