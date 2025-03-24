export interface UserRepository {
  signup(params: SignupParams): Promise<void>;
}

export type SignupParams = {
  email: string;
  password: string;
  citizenName: string;
};
