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

const CONTAINER_STYLE = "min-h-screen bg-slate-50 text-slate-800 font-sans flex"; // <-- 'flex' ajouté ici pour mettre la sidebar à gauche
const NAV_STYLE = "bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm";
const BRAND_STYLE = "text-xl font-bold text-slate-800 flex items-center gap-2";
const BRAND_SPAN_STYLE = "text-blue-600";
const USER_INFO_STYLE = "flex items-center gap-4 text-sm";
const ROLE_BADGE_STYLE ="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
const LOGOUT_BTN_STYLE ="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer";
function getHomePath(role) {
  return role === "admin" ? "/admin" : "/student";
}


import { Dashboard } from "./components/Dashboard";
import { Courses } from "./components/Courses";

export default function App() {
  const [currentTab, setCurrentTab] = useState("courses");
  const [token, setToken] = useState("faux_token_de_test_sécurisé");

  /*
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  */
  const [user, setUser] = useState({
    first_name: "Admin",
    last_name: "Test",
    role: "admin",
  });
  /*
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);
  */

  const handleLoginSuccess = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

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