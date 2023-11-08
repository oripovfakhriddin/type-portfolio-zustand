import { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/admin";
import ClientLayout from "./components/layouts/client";
import PublicLayout from "./components/layouts/public_layout";
import DashboardPage from "./pages/admin/dashboard";
import AdminEducationPage from "./pages/admin/education";
import AdminExperiencesPage from "./pages/admin/experiences";
import AdminPortfoliosPage from "./pages/admin/portfolios";
import AdminSkillsPage from "./pages/admin/skills";
import AdminUsersPage from "./pages/admin/users";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ClientEducationPage from "./pages/client/education";
import ClientExperiencesPage from "./pages/client/experiences";
import ClientHomePage from "./pages/client/home";
import ClientPortfoliosPage from "./pages/client/portfolios";
import ClientSkillsPage from "./pages/client/skills";
import PublicHomePage from "./pages/public/home";
import useLoginStore from "./zustand/auth/login";

function App() {
  const { isAuthenticated, role } = useLoginStore();

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PublicHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route
            element={
              isAuthenticated && role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin-skills" element={<AdminSkillsPage />} />
            <Route path="/admin-education" element={<AdminEducationPage />} />
            <Route path="/admin-users" element={<AdminUsersPage />} />
            <Route path="/admin-portfolios" element={<AdminPortfoliosPage />} />
            <Route
              path="/admin-experiences"
              element={<AdminExperiencesPage />}
            />
          </Route>

          <Route
            element={
              isAuthenticated && role === "client" ? (
                <ClientLayout />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="/client-home" element={<ClientHomePage />} />
            <Route
              path="/client-experiences"
              element={<ClientExperiencesPage />}
            />
            <Route path="/client-skills" element={<ClientSkillsPage />} />
            <Route path="/client-education" element={<ClientEducationPage />} />
            <Route
              path="/client-portfolios"
              element={<ClientPortfoliosPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
