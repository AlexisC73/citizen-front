import { AuthState } from "../../store/auth/auth-slice";

export interface UserRepository {
  signup(params: SignupParams): Promise<void>;
  signin(params: SigninParams): Promise<AuthState["user"]>;
  getMyInfo(): Promise<AuthState["user"]>;
}

export type SignupParams = {
  email: string;
  password: string;
  citizenName: string;
};

export type SigninParams = {
  email: string;
  password: string;
};
