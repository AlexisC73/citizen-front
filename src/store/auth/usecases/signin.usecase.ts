import { createAppAsyncThunk } from "../../create-app-thunk";

export const signinUsecase = createAppAsyncThunk(
  "auth/signup",
  async (params: SigninUsecaseParams, { extra: { userRepository } }) => {
    try {
      const result = await userRepository.signin({
        email: params.email,
        password: params.password,
      });
      return result;
    } catch (e: any) {
      return null;
    }
  },
);

export interface SigninUsecaseParams {
  email: string;
  password: string;
}
