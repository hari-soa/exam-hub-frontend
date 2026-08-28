import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminStudents from './pages/AdminStudents';
import AdminCourses from './pages/AdminCourses';
import AdminExams from './pages/AdminExams';
import AdminQuestions from './pages/AdminQuestions';
import AdminResults from './pages/AdminResults';

import StudentExams from './pages/StudentExams';
import StudentTakeExam from './pages/StudentTakeExam';
import StudentExamResult from './pages/StudentExamResult';
import StudentHistory from './pages/StudentHistory';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute role="admin"><AdminStudents /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute role="admin"><AdminCourses /></ProtectedRoute>} />
          <Route path="/admin/exams" element={<ProtectedRoute role="admin"><AdminExams /></ProtectedRoute>} />
          <Route path="/admin/exams/:id/questions" element={<ProtectedRoute role="admin"><AdminQuestions /></ProtectedRoute>} />
          <Route path="/admin/exams/:id/results" element={<ProtectedRoute role="admin"><AdminResults /></ProtectedRoute>} />

          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute role="student"><StudentExams /></ProtectedRoute>} />
          <Route path="/student/exams/:id" element={<ProtectedRoute role="student"><StudentTakeExam /></ProtectedRoute>} />
          <Route path="/student/exams/:id/result" element={<ProtectedRoute role="student"><StudentExamResult /></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute role="student"><StudentHistory /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}