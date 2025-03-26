import {
  SigninParams,
  SignupParams,
  UserRepository,
} from "../domain/repository.ts/user.repository";
import { AuthState } from "../store/auth/auth-slice";

interface ApiUser {
  id: string;
  email: string;
  password: string;
  citizenName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class LocalStorageUserRepository implements UserRepository {
  users: ApiUser[] = this.getExistingUsers();

  authenticatedAs: AuthState["user"] | null = this.getSignedUser();

  async signup(params: SignupParams): Promise<void> {
    const existUser = this.users.find((u) => u.email === params.email);

    this.addUser({
      id: existUser?.id ?? this.genereateId(),
      email: params.email,
      password: params.password,
      citizenName: params.citizenName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async signin(params: SigninParams): Promise<AuthState["user"]> {
    const user = this.users.find((u) => u.email === params.email);
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

  async signout(): Promise<void> {
    this.authenticatedAs = null;
    localStorage.removeItem("authenticatedAs");
  }

  private signinUser(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    this.authenticatedAs = {
      id,
      avatarUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      citizenName: user.citizenName,
    };
    localStorage.setItem(
      "authenticatedAs",
      JSON.stringify(this.authenticatedAs),
    );
    return;
  }

  private addUser(user: ApiUser) {
    const mapUser = new Map(this.users.map((u) => [u.id, u]));
    mapUser.set(user.id, user);
    this.users = Array.from(mapUser.values());
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  private getExistingUsers() {
    const users = localStorage.getItem("users");
    if (!users) {
      return [];
    }
    return JSON.parse(users);
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
