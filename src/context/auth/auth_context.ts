import { createContext } from "react";

export interface User {
  avatarUrl: string;
}

export interface AuthContext {
  user: User | null;
  toggleAuth: () => void;
}

export const AuthCtx = createContext<AuthContext>({
  user: null,
  toggleAuth: () => {},
});
