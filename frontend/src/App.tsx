import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Context Providers
import { AppProvider, useApp } from "./context/AppContext";
import { ColorModeContext, useMode } from "./theme";

// Layout Components
import Topbar from "./scenes/dashboard/global/topbar";
import Sidebar from "./scenes/dashboard/global/sidebar";
import Header from "./components/layout/Header";
import Toaster from "./components/common/Toaster";

// Pages & Scenes
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/Form";
import Calendar from "./scenes/calendar/calendar";
import Companies from "./scenes/companies";
import CompanyDetails from "./scenes/companyDetails";
import CompanyDashboard from "./scenes/companyDashboard";
import Applicants from "./scenes/applicants";
import Login from "./scenes/login";

// Public User Platform Pages
import JobsPage from "./pages/JobsPage";
import CompanyPage from "./pages/CompanyPage";
import AiChat from "./components/ai/AiChat";
import CVBuilderPage from "./pages/CVBuilderPage";

/**
 * مكون المنصة العامة للوظائف والخدمات
 */
function PublicPlatform() {
  const { activePage, activeCompanyId } = useApp();
  const [searchQ, setSearchQ] = useState("");

  return (
    <div style={{ minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" }}>
      <Header searchQ={searchQ} onSearch={setSearchQ} />
      <main>
        {activeCompanyId ? (
          <CompanyPage companyId={activeCompanyId} />
        ) : (
          <>
            {activePage === "jobs" && <JobsPage searchQ={searchQ} />}
            {activePage === "ai" && <AiChat />}
            {activePage === "cv" && (
              <div style={{ direction: "ltr" }}>
                <CVBuilderPage />
              </div>
            )}
          </>
        )}
      </main>
      <Toaster />
    </div>
  );
}

/**
 * المكون الرئيسي للتطبيق
 */
function AppContent() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isDashboardRoute = [
    "/dashboard",
    "/team",
    "/contacts",
    "/invoices",
    "/form",
    "/calendar",
    "/companies",
    "/company-details",
    "/company-dashboard",
    "/applicants",
  ].some((path) => location.pathname.startsWith(path));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isDashboardRoute || isLoginPage ? (
          <div className="app">
            {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/company-details" element={<CompanyDetails />} />
                <Route path="/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/applicants" element={<Applicants />} />
              </Routes>
            </main>
          </div>
        ) : (
          <Routes>
            <Route path="/*" element={<PublicPlatform />} />
          </Routes>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}