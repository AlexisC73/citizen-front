import { createAppAsyncThunk } from "../../create-app-thunk";

export const signinUsecase = createAppAsyncThunk(
  "auth/signin",
  async (params: SigninUsecaseParams, { extra: { userRepository } }) => {
    const result = await userRepository.signin({
      email: params.email,
      password: params.password,
    });
    return result;
  },
);

export interface SigninUsecaseParams {
  email: string;
  password: string;
}
