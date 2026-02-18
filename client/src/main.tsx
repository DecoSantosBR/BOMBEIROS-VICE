import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";

import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from "@shared/const";
import { getLoginUrl } from "./const";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

/**
 * 🔐 Redirect automático se não autorizado
 */
const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;
  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

/**
 * 👀 Observa erros de queries
 */
queryClient.getQueryCache().subscribe((event) => {
  if (event?.type === "updated" && event.action?.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

/**
 * 👀 Observa erros de mutations
 */
queryClient.getMutationCache().subscribe((event) => {
  if (event?.type === "updated" && event.action?.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

/**
 * 🌐 tRPC client
 */
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

/**
 * 🚨 FIX PRINCIPAL — valida o root
 */
const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element not found. Verifique o index.html");
}

createRoot(container).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
