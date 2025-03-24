import { signoutUsecase } from "../../../store/auth/usecases/signout.usecase";
import { useAppDispatch } from "../../../store/store";

export function SignoutButton() {
  const dispatch = useAppDispatch();

  const handleSignout = () => {
    dispatch(signoutUsecase());
  };

  return (
    <button className="btn btn-ghost" onClick={handleSignout}>
      Signout
    </button>
  );
}
