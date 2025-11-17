import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarSchool from './components/navbarschool';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import TeachersPage from './pages/teacherspage';
import StudentsPage from './pages/studentspage';
import { isLoggedIn } from './utils/auth';

function Protected({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <NavbarSchool />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
