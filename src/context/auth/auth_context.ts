import { createContext } from "react";

export interface User {
  avatarUrl: string;
}

export interface AuthContext {
  user: User | null;
}

export const AuthCtx = createContext<AuthContext>({
  user: null,
});
