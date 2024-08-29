import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/custom/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout";

import Home from "./pages/home";
import Sessions from "./pages/sessions";
import Session from "./pages/session";

const queryClient = new QueryClient();

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/session/:id" element={<Session />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Router;
