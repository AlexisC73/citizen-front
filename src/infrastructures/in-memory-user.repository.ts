import {
  SigninParams,
  SignupParams,
  UserRepository,
} from "../domain/repository.ts/user.repository";
import { AuthState } from "../store/auth/auth-slice";

export class InMemoryUserRepository implements UserRepository {
  user: {
    id: string;
    email: string;
    password: string;
    citizenName: string;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];

  authenticatedAs: AuthState["user"] | null = this.getSignedUser();

  async signup(params: SignupParams): Promise<void> {
    const userMap = new Map(this.user.map((u) => [u.email, u]));
    userMap.set(params.email, {
      id: this.genereateId(),
      email: params.email,
      password: params.password,
      citizenName: params.citizenName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.user = Array.from(userMap.values());
  }

  async signin(params: SigninParams): Promise<AuthState["user"]> {
    const user = this.user.find((u) => u.email === params.email);
    if (!user || user.password !== params.password) {
      throw new Error("User not found");
    }
    this.signinUser(user.id);
    return this.authenticatedAs;
  }

  async getMyInfo(): Promise<AuthState["user"]> {
    if (!this.authenticatedAs) {
      throw new Error("User not found");
    }
    return this.authenticatedAs;
  }

  private signinUser(id: string) {
    this.authenticatedAs = {
      id,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    };
    localStorage.setItem(
      "authenticatedAs",
      JSON.stringify(this.authenticatedAs),
    );
    return;
  }

  private getSignedUser() {
    const user = localStorage.getItem("authenticatedAs");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  private genereateId() {
    return crypto.randomUUID();
  }
}
