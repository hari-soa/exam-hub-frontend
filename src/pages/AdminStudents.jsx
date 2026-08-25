import { useMemo, useState } from "react";
import { Search, UserCheck, UserX, Eye, Edit, Layers3, TableProperties } from "lucide-react";
import StudentDetailsDrawer from "../components/StudentDetailsDrawer";
import StudentEditModal from "../components/StudentEditModal";
import { studentsData } from "../data/mockData";

const statusStyles = {
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-rose-100 text-rose-700",
};

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-amber-100 text-amber-600",
  "bg-violet-100 text-violet-600",
  "bg-rose-100 text-rose-600",
];

const studentTimeline = [
  { exam: "Développement Web", date: "15/06/2026", score: 18, total: 20, result: "Réussi" },
  { exam: "Algorithmique 2", date: "02/06/2026", score: 16, total: 20, result: "Réussi" },
  { exam: "Réseaux avancés", date: "28/05/2026", score: 12, total: 20, result: "Échoué" },
  { exam: "Bases de données", date: "18/05/2026", score: 17, total: 20, result: "Réussi" },
];

export default function AdminStudents() {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [viewStudent, setViewStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = q === "" || [student.name, student.email, student.id].some((value) => value.toLowerCase().includes(q));
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  const activeCount = students.filter((student) => student.status === "active").length;
  const inactiveCount = students.filter((student) => student.status === "inactive").length;

  const onView = (student) => setViewStudent(student);
  const onEdit = (student) => setEditStudent({ ...student });
  const onCloseDrawer = () => {
    setViewStudent(null);
    setEditStudent(null);
  };

  const onSaveEdit = () => {
    setStudents((prev) => prev.map((s) => (s.id === editStudent.id ? editStudent : s)));
    setViewStudent(editStudent);
    setEditStudent(null);
  };

  const onToggleStatus = (updatedStudent) => {
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    setViewStudent(updatedStudent);
  };

  const onResetPassword = (studentId, generatedPassword) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              passwordReset: generatedPassword,
              lastPasswordReset: new Date().toLocaleDateString("fr-FR"),
            }
          : s,
      ),
    );
  };

  const getAvatarClass = (idx) => avatarColors[idx % avatarColors.length];

  const getStudentProfileStats = (student) => {
    const history = studentTimeline;
    const average = (history.reduce((sum, item) => sum + Number(item.score), 0) / history.length).toFixed(1);
    const passed = history.filter((item) => item.result === "Réussi").length;
    const participation = Math.min(100, Math.round((history.length / 5) * 100));

    return {
      average: `${average}/20`,
      participation: `${participation}%`,
      validated: `${passed} / ${history.length}`,
      badge: student.status === "active" ? "Actif" : "Non actif",
    };
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Étudiants</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">Gestion des étudiants</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{ label: "Total", value: students.length, icon: UserCheck, tone: "blue" }, { label: "Actifs", value: activeCount, icon: UserCheck, tone: "emerald" }, { label: "Non actifs", value: inactiveCount, icon: UserX, tone: "rose" }, { label: "Actions", value: "Rechercher • Filtrer", icon: Layers3, tone: "slate" }].map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="h-full flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-3xl font-bold text-slate-800">{value}</span>
                <div className={`rounded-xl p-2 ${tone === "blue" ? "bg-blue-100 text-blue-600" : tone === "emerald" ? "bg-emerald-100 text-emerald-600" : tone === "rose" ? "bg-rose-100 text-rose-600" : "bg-slate-100 text-slate-600"}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
            {label === "Actifs" && <p className="mt-2 text-xs text-slate-500">{Math.round((activeCount / students.length) * 100)}% du total</p>}
            {label === "Non actifs" && <p className="mt-2 text-xs text-slate-500">{Math.round((inactiveCount / students.length) * 100)}% du total</p>}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un étudiant..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "table" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
                }`}
              >
                <TableProperties className="h-4 w-4" /> Tableau
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  viewMode === "grid" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
                }`}
              >
                <Layers3 className="h-4 w-4" /> Grille
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">Filtrer</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400"
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Non actifs</option>
              </select>
            </div>
          </div>
        </div>

        {viewMode === "table" ? (
          <>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left">
                <thead className="bg-slate-50 text-sm text-slate-600">
                  <tr>
                    <th className="px-6 py-4 font-medium">Étudiant</th>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Date d’inscription</th>
                    <th className="px-6 py-4 font-medium">Statut</th>
                    <th className="px-6 py-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
                  {filteredStudents.map((student, idx) => (
                    <tr key={student.id} className="align-middle">
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold text-xs ${getAvatarClass(idx)}`}>
                            {student.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.group || "-"} • {student.level || "-"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle font-medium text-slate-600 whitespace-nowrap">{student.id}</td>
                      <td className="px-6 py-4 align-middle whitespace-nowrap text-slate-600">{student.email}</td>
                      <td className="px-6 py-4 align-middle whitespace-nowrap">{student.joinedAt}</td>
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[student.status]}`}>
                          {student.status === "active" ? "Actif" : "Non actif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button onClick={() => onView(student)} type="button" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                            <Eye className="h-4 w-4" /> Voir
                          </button>
                          <button onClick={() => onEdit(student)} type="button" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700">
                            <Edit className="h-4 w-4" /> Modifier
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
              <span>Page 1 / 2</span>
              <div className="flex gap-2">
                <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Précédent</button>
                <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Suivant</button>
              </div>
            </div>
          </>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredStudents.map((student, idx) => {
              const metrics = getStudentProfileStats(student);
              return (
                <div key={student.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full font-semibold ${getAvatarClass(idx)}`}>
                        {student.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.id}</p>
                      </div>
                    </div>
                    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[student.status]}`}>
                      {metrics.badge}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Moy.</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{metrics.average}</p>
                    </div>
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Prés.</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{metrics.participation}</p>
                    </div>
                    <div className="rounded-xl bg-white p-2">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">Validés</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{metrics.validated}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p>{student.email}</p>
                    <p>{student.joinedAt}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => onView(student)} type="button" className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Voir
                    </button>
                    <button onClick={() => onEdit(student)} type="button" className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      Modifier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <StudentDetailsDrawer
        student={viewStudent}
        onClose={onCloseDrawer}
        onEdit={onEdit}
        onToggleStatus={onToggleStatus}
        onResetPassword={onResetPassword}
      />
      <StudentEditModal student={editStudent} onClose={onCloseDrawer} onSave={onSaveEdit} setStudent={setEditStudent} />
    </div>
  );
}
