import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={() => { logout(); navigate('/login'); }} className="text-sm bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/students" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-indigo-600">Manage Students</h2>
          <p className="text-gray-500 text-sm mt-1">Create, edit, reset passwords or deactivate students.</p>
        </Link>
        <Link to="/admin/courses" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-indigo-600">Manage Courses</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage academic courses.</p>
        </Link>
        <Link to="/admin/exams" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-indigo-600">Manage Exams</h2>
          <p className="text-gray-500 text-sm mt-1">Configure exams, questions, and view results.</p>
        </Link>
      </div>
    </div>
  );
}