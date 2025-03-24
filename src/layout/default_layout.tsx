import Header from "../components/header/header";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectAuth } from "../store/auth/auth-slice";
import { signoutUsecase } from "../store/auth/usecases/signout.usecase";

export default function DefaultLayout() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const handleSignout = () => {
    dispatch(signoutUsecase());
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header performSignout={handleSignout} authenticatedUser={user} />
      <Outlet />
    </div>
  );
}
