import { Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientLayout from "./components/layouts/client";

import AdminSkillsPage from "./pages/admin/skills";
import AdminEducationPage from "./pages/admin/education";
import ClientExperiencesPage from "./pages/client/experiences_page";
import ClientSkillsPage from "./pages/client/skills_page";
import ClientHomePage from "./pages/client/home_page";
import DashboardPage from "./pages/admin/dashboard";
import AdminUsersPage from "./pages/admin/users";
import AdminPortfoliosPage from "./pages/admin/portfolios";
import AdminExperiencesPage from "./pages/admin/experiences";
import useLoginStore from "./zustand/auth/login";
import AdminLayout from "./components/layouts/admin";
import PublicLayout from "./components/layouts/public_layout";
import PublicHomePage from "./pages/public/home";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

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
              isAuthenticated && role === "admin" ? (
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
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
