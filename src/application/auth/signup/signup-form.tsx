import { useNavigate } from "react-router-dom";
import {
  signupUsecase,
  SignupUsecaseParams,
} from "../../../store/auth/usecases/signup.usecase";
import { useAppDispatch } from "../../../store/store";
import { SignupFormBase } from "./signup-form-base";

export function SignupForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignup = async (params: SignupUsecaseParams) => {
    await dispatch(signupUsecase(params)).then(() => {
      navigate("/auth");
    });
  };

  return <SignupFormBase signup={handleSignup} />;
}
