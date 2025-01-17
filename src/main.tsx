import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "react-query";
enableReactUse();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <Notifications />
          <App />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
