import { createAppAsyncThunk } from "../../create-app-thunk";

export const signoutUsecase = createAppAsyncThunk(
  "auth/signout",
  async (_, { extra: { userRepository } }) => {
    return userRepository.signout();
  },
);
