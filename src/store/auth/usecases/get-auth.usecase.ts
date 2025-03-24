import { createAppAsyncThunk } from "../../create-app-thunk";

export const getAuthAsyncThunk = createAppAsyncThunk(
  "auth/getAuth",
  async (_, { extra: { userRepository } }) => {
    return userRepository.getMyInfo();
  },
);
