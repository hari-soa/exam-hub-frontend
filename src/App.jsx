import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Login } from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCourseDetail from "./pages/AdminCourseDetail";
import AdminCourses from "./pages/AdminCourses";
import AdminDashboard from "./pages/AdminDashboard";
import AdminExamHistory from "./pages/AdminExamHistory";
import AdminExams from "./pages/AdminExams";
import AdminResults from "./pages/AdminResults";
import AdminStudents from "./pages/AdminStudents";
import ExamQuestionsEditor from "./pages/ExamQuestionsEditor";
import AdminProfile from "./pages/AdminProfile";
import StudentExamResult from "./pages/StudentExamResult";
import StudentExamTaking from "./pages/StudentExamTaking";
import StudentExams from "./pages/StudentExams";
import StudentHistory from "./pages/StudentHistory";
import StudentProfile from "./pages/StudentProfile";

function getHomePath(role) {
  return role === "admin" ? "/admin" : "/student";
}


function AppRoutes() {
  const navigate = useNavigate();
  const { user, login, role } = useAuth();

  const handleLoginSuccess = (token, userData) => {
    login(token, userData);
    navigate(getHomePath(userData?.role), { replace: true });
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? getHomePath(role) : "/login"} replace />} />
      <Route
        path="/login"
        element={user ? <Navigate to={getHomePath(role)} replace /> : <Login onLoginSuccess={handleLoginSuccess} />}
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AppLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="cours" element={<AdminCourses />} />
        <Route path="cours/:courseId" element={<AdminCourseDetail />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="exams" element={<AdminExams />} />
        <Route path="exams/history" element={<AdminExamHistory />} />
        <Route path="exams/:examId/questions" element={<ExamQuestionsEditor />} />
        <Route path="exams/:examId/results" element={<AdminResults />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <AppLayout role="student" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentExams />} />
        <Route path="exams/:examId" element={<StudentExamTaking />} />
        <Route path="exams/:examId/result" element={<StudentExamResult />} />
        <Route path="results" element={<StudentHistory />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? getHomePath(role) : "/login"} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}