import { createAppAsyncThunk } from "../../create-app-thunk";

export const getAuthAsyncThunk = createAppAsyncThunk("auth/getAuth", () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  const parsedUser = JSON.parse(user);
  if (typeof parsedUser !== "object") {
    return null;
  }
  if ("id" in parsedUser && "avatarUrl" in parsedUser) {
    return {
      id: parsedUser.id,
      avatarUrl: parsedUser.avatarUrl,
    };
  }
  return null;
});
