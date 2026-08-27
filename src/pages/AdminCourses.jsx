import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle2, Clock3, Swords, Search, ChevronRight } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
          query === "" ||
          course.title.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query) ||
          course.professor.toLowerCase().includes(query);

      const matchesSemester = semester === "all" || course.semester === semester;
      const matchesStatus = status === "all" || course.status === status;

      return matchesSearch && matchesSemester && matchesStatus;
    });
  }, [semester, status, searchQuery]);

  const uniqueSemesters = useMemo(() => {
    return [...new Set(coursesData.map((course) => course.semester))];
  }, []);

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Cours</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">Gestion des cours</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">Total cours</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-3xl font-bold text-slate-800">{coursesData.length}</span>
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">Terminés</p>
            <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">
              {coursesData.filter((course) => course.status === "completed").length}
            </span>
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">En cours</p>
            <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">
              {coursesData.filter((course) => course.status === "in_progress").length}
            </span>
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">À venir</p>
            <div className="mt-3 flex items-center justify-between">
            <span className="text-3xl font-bold text-slate-800">
              {coursesData.filter((course) => course.status === "upcoming").length}
            </span>
              <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                <Swords className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un cours..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">Semestre :</span>
                <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 cursor-pointer hover:bg-slate-100"
                >
                  <option value="all">Tous</option>
                  {uniqueSemesters.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">Statut :</span>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400 cursor-pointer hover:bg-slate-100"
                >
                  <option value="all">Tous</option>
                  <option value="completed">Terminé</option>
                  <option value="in_progress">En cours</option>
                  <option value="upcoming">À venir</option>
                </select>
              </div>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
              <div className="py-12 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                <p className="text-sm font-medium text-slate-500">Aucun cours trouvé pour ces critères.</p>
              </div>
          ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                    <Link
                        key={course.id}
                        to={`/admin/cours/${course.id}`}
                        className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-white hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-200">
                            {course.icon}
                          </div>
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[course.status]}`}>
                      {statusLabel[course.status]}
                    </span>
                        </div>

                        <div className="mt-4">
                          <p className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-150">
                            {course.title}
                          </p>
                          <p className="mt-0.5 text-xs font-medium text-slate-400">{course.code}</p>
                        </div>

                        <div className="mt-4 space-y-2 border-t border-slate-200/60 pt-3 text-sm text-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Professeur</span>
                            <span className="font-medium text-slate-700 text-xs">{course.professor}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Crédits</span>
                            <span className="font-medium text-slate-700 text-xs">{course.credits} ECTS</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">Semestre</span>
                            <span className="font-medium text-slate-700 text-xs">{course.semester}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-slate-200/60 pt-3.5">
                        <div className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs transition-all duration-150 group-hover:bg-blue-50 group-hover:text-blue-700 active:scale-95">
                          <span>Consulter le cours</span>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </Link>
                ))}
              </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span>
            Affichage de <strong className="font-semibold text-slate-700">{filteredCourses.length}</strong> cours
          </span>
            <div className="flex gap-2">
              <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600 active:scale-95 cursor-pointer"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}