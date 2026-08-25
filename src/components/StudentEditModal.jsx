import { createPortal } from "react-dom";
import { Save, X } from "lucide-react";

export default function StudentEditModal({ student, onClose, onSave, setStudent }) {
  if (!student) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                {student.avatar}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Modifier l'étudiant</h3>
                <p className="text-sm text-slate-500">{student.id}</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Fermer la modale">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Nom complet</label>
              <input
                value={student.name}
                onChange={(event) => setStudent((current) => ({ ...current, name: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
              <input
                value={student.email}
                onChange={(event) => setStudent((current) => ({ ...current, email: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Statut</label>
              <select
                value={student.status}
                onChange={(event) => setStudent((current) => ({ ...current, status: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              >
                <option value="active">Actif</option>
                <option value="inactive">Non actif</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Niveau / Groupe</label>
              <input
                value={student.level || ""}
                onChange={(event) => setStudent((current) => ({ ...current, level: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Annuler
            </button>
            <button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
              <Save className="h-4 w-4" /> Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
