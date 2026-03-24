import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { RoleSelectPage } from './pages/auth/RoleSelectPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { AdminPanel } from './pages/admin/AdminPanel';
import { CourierDashboard } from './pages/courier/CourierDashboard';
import { ResourcesPage } from './pages/ResourcesPage';
import { GamificationPage } from './pages/GamificationPage';
import { MapSection } from './pages/MapSection';
import { ContactPage } from './pages/ContactPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useLocation } from 'react-router-dom';

import { LoadingProvider } from './context/LoadingContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <ScrollToTop />
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/role-select" element={<RoleSelectPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/settings" element={<SettingsPage />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/courier" element={<CourierDashboard />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/classes" element={<ResourcesPage />} />
        <Route path="/materials" element={<ResourcesPage />} />
        <Route path="/gamification" element={<GamificationPage />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </LoadingProvider>
  </BrowserRouter>);
}