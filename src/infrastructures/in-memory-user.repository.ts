import {
  SignupParams,
  UserRepository,
} from "../domain/repository.ts/user.repository";

export class InMemoryUserRepository implements UserRepository {
  user: {
    id: string;
    email: string;
    password: string;
    citizenName: string;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];

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

  private genereateId() {
    return crypto.randomUUID();
  }
}
