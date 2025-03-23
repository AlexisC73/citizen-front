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

export const DEFAULT_USER = {
  avatarUrl:
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
};
