import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./router.tsx";
import AuthProvider from "./context/auth/auth_provider.tsx";
import { Provider } from "react-redux";
import { createStore } from "./store/store.ts";

const store = createStore();

const router = createRouter({ store });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
