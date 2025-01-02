import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import { RouterProvider } from "react-router-dom";
import router from "./lib/router/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppAuthProvider from "./lib/auth/AuthContextProvider.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60e3,
            refetchOnWindowFocus: false,
            retry: 3,
        },
    },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppAuthProvider>
                <RouterProvider router={router} />
            </AppAuthProvider>
        </QueryClientProvider>
    </StrictMode>,
);
