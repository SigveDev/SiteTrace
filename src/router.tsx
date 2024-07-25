import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/custom/theme-provider";
import Layout from "./components/layout";

import Home from "./pages/home";

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Router;
