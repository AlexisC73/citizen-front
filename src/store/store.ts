import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type Dependencies = object;

const dependencies: Dependencies = {};

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
