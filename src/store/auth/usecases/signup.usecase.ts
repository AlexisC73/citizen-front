import { createAppAsyncThunk } from "../../create-app-thunk";

export const signupUsecase = createAppAsyncThunk(
  "auth/signup",
  async (params: SignupUsecaseParams, { extra: { userRepository } }) => {
    await userRepository.signup({
      email: params.email,
      password: params.password,
      citizenName: params.citizenName,
    });
    return;
  },
);

export interface SignupUsecaseParams {
  email: string;
  password: string;
  citizenName: string;
  confirmationPassword: string;
}
