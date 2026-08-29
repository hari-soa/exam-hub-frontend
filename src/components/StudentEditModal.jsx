import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Save, X, Loader2 } from "lucide-react";
import api from "../api/client";

export default function StudentEditModal({ student, onClose, onStudentUpdated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    is_active: true,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        is_active: student.is_active ?? true,
        password: "",
      });
    }
  }, [student]);

  if (!student) return null;

  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        is_active: formData.is_active,
      };
      if (formData.password) {
        payload.password = formData.password;
      }

      const response = await api.put(`/students/${student.id}`, payload);
      
      if (onStudentUpdated) {
        onStudentUpdated(response.data);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                {student.name?.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Edit Student</h3>
                <p className="text-sm text-slate-500">ID: {student.id}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close modal">
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Full Name</label>
              <input
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Status</label>
              <select
                value={formData.is_active ? "true" : "false"}
                onChange={(event) => handleChange("is_active", event.target.value === "true")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">New Password (optional)</label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={(event) => handleChange("password", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              disabled={loading}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="button" 
              onClick={handleSave} 
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}