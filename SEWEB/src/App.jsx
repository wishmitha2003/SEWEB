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
import { ClassesPage } from './pages/ClassesPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { GamificationPage } from './pages/GamificationPage';
import { MapSection } from './pages/MapSection';
import { ContactPage } from './pages/ContactPage';
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
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/courier" element={<CourierDashboard />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/gamification" element={<GamificationPage />} />
        <Route path="/map" element={<MapSection />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </LoadingProvider>
  </BrowserRouter>);
}