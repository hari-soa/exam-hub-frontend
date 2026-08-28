import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Save, X } from "lucide-react";

export default function StudentEditModal({ student, onClose, onSave, setStudent }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return createPortal(
      <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="absolute inset-0" onClick={onClose} />
          <div
              role="dialog"
              aria-modal="true"
              aria-label="Modifier l'étudiant"
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 shadow-xs">
                  {student.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Modifier l'étudiant</h3>
                  <p className="font-mono text-xs font-medium text-slate-500">{student.id}</p>
                </div>
              </div>
              <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 active:scale-95 transition-all duration-200 cursor-pointer"
                  aria-label="Fermer la modale"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Nom complet</label>
                <input
                    type="text"
                    value={student.name || ""}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-xs"
                    required
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Email</label>
                <input
                    type="email"
                    value={student.email || ""}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-xs"
                    required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Statut</label>
                  <select
                      value={student.status || "active"}
                      onChange={(e) => setStudent({ ...student, status: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-xs cursor-pointer"
                  >
                    <option value="active">Actif</option>
                    <option value="inactive">Non actif</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Niveau / Groupe</label>
                  <input
                      type="text"
                      value={student.level || ""}
                      onChange={(e) => setStudent({ ...student, level: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:shadow-xs"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body,
  );
}