import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { UserRepository } from "../domain/repository.ts/user.repository";
import { LocalStorageUserRepository } from "../infrastructures/local-storage-user.repository";
import { OrganizationRepository } from "../domain/repository.ts/organization.repository";
import { LocalStorageOrganizationRepository } from "../infrastructures/local-storage-organization.repository";

export interface Dependencies {
  userRepository: UserRepository;
  organizationRepository: OrganizationRepository;
}

const dependencies: Dependencies = {
  userRepository: new LocalStorageUserRepository(),
  organizationRepository: new LocalStorageOrganizationRepository(),
};

export const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
