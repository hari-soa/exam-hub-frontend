import { useState } from "react";
import { createPortal } from "react-dom";
import { X, KeyRound, ShieldCheck, ShieldOff, Mail, Calendar, Loader2 } from "lucide-react";
import api from "../api/client";

export default function StudentDetailsDrawer({ student, onClose, onStudentUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  if (!student) return null;

  const handleToggleStatus = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");
    try {
      if (student.is_active) {
        const response = await api.delete(`/students/${student.id}`);
        onStudentUpdated?.(response.data);
      } else {
        const response = await api.put(`/students/${student.id}`, {
          name: student.name,
          email: student.email,
          is_active: true,
        });
        onStudentUpdated?.(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student status.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    const newPassword = prompt("Enter new password for the student:");
    if (!newPassword) return;

    setLoading(true);
    setError(null);
    setSuccessMessage("");
    try {
      await api.put(`/students/${student.id}`, {
        name: student.name,
        email: student.email,
        is_active: student.is_active,
        password: newPassword,
      });
      setSuccessMessage("Password successfully reset.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-lg flex-col bg-white shadow-2xl">
        <div className="relative bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-500 p-6 text-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/20"
            aria-label="Close profile"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 pt-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-xl font-bold">
              {student.name?.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Student Profile</p>
              <h3 className="mt-1 truncate text-2xl font-bold">{student.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-blue-100">
                <span>ID: {student.id}</span>
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">
                  {student.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <KeyRound className="h-4 w-4" /> Reset Password
            </button>
            <button
              type="button"
              onClick={handleToggleStatus}
              disabled={loading}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
                student.is_active
                  ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              } disabled:opacity-50`}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : student.is_active ? (
                <ShieldOff className="h-4 w-4" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {student.is_active ? "Deactivate" : "Activate"}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Account Information</h4>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{student.email}</span>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Created at: {student.created_at ? new Date(student.created_at).toLocaleString() : "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}