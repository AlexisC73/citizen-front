import {
  signinUsecase,
  SigninUsecaseParams,
} from "../../../store/auth/usecases/signin.usecase";
import { useAppDispatch } from "../../../store/store";
import { SigninFormBase } from "./signin-form-base";

export function SigninForm() {
  const dispatch = useAppDispatch();

  const handleSignin = async (params: SigninUsecaseParams) => {
    await dispatch(signinUsecase(params));
  };

  return <SigninFormBase signin={handleSignin} />;
}
