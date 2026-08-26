import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock3, Swords } from "lucide-react";
import { coursesData } from "../data/mockData";

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-blue-100 text-blue-700",
  upcoming: "bg-amber-100 text-amber-700",
};

const statusLabel = {
  completed: "Terminé",
  in_progress: "En cours",
  upcoming: "À venir",
};

export default function AdminCourses() {
  const [semester, setSemester] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesSemester = semester === "all" || course.semester === semester;
      const matchesStatus = status === "all" || course.status === status;
      return matchesSemester && matchesStatus;
    });
  }, [semester, status]);

  const uniqueSemesters = [...new Set(coursesData.map((course) => course.semester))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Cours</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">Gestion des cours</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total cours</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{coursesData.length}</span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600"><BookOpen className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Terminés</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{coursesData.filter((course) => course.status === "completed").length}</span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">En cours</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{coursesData.filter((course) => course.status === "in_progress").length}</span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600"><Clock3 className="h-5 w-5" /></div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">À venir</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">{coursesData.filter((course) => course.status === "upcoming").length}</span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-600"><Swords className="h-5 w-5" /></div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Semestre</span>
            <select
              value={semester}
              onChange={(event) => setSemester(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
            >
              <option value="all">Tous</option>
              {uniqueSemesters.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">Statut</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400"
            >
              <option value="all">Tous</option>
              <option value="completed">Terminé</option>
              <option value="in_progress">En cours</option>
              <option value="upcoming">À venir</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/admin/cours/${course.id}`}
              className="group h-full flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:bg-white cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    {course.icon}
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[course.status]}`}>
                    {statusLabel[course.status]}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-lg font-semibold text-slate-800">{course.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{course.code}</p>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Professeur</span>
                    <span className="font-medium text-slate-700">{course.professor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crédits</span>
                    <span className="font-medium text-slate-700">{course.credits}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Semestre</span>
                    <span className="font-medium text-slate-700">{course.semester}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Page 1 / 2</span>
          <div className="flex gap-2">
            <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Précédent</button>
            <button type="button" className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
