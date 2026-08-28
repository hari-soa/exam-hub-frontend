import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, Clock3, UserRound, ChevronRight } from "lucide-react";
import { adminExamList, courseDetails, coursesData } from "../data/mockData";

const examBadgeStyles = {
  available: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  disabled: "bg-slate-100 text-slate-700",
};

const examLabel = {
  available: "Disponible",
  in_progress: "En cours",
  completed: "Validé",
  disabled: "Désactivé",
};

export default function AdminCourseDetail() {
  const { courseId } = useParams();
  const course = coursesData.find((item) => item.id === courseId);
  const details = courseDetails[courseId] || { description: "Aucune description disponible pour ce cours.", content: [] };

  const linkedExams = useMemo(() => {
    return adminExamList.filter((exam) => exam.courseId === courseId && exam.status !== "disabled");
  }, [courseId]);

  if (!course) {
    return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Cours introuvable.
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Cours</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">{course.title}</h2>
          </div>
          <Link
              to="/admin/cours"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-150 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl shadow-sm border border-blue-50">
                  {course.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">{course.code}</p>
                  <h3 className="text-2xl font-bold text-slate-800">{course.title}</h3>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {course.semester}
            </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                <p className="text-xs font-medium text-slate-500">Professeur</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <UserRound className="h-4 w-4 text-blue-600" />
                  {course.professor}
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                <p className="text-xs font-medium text-slate-500">Crédits</p>
                <p className="mt-2 text-sm font-bold text-slate-800">{course.credits} ECTS</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                <p className="text-xs font-medium text-slate-500">Semestre</p>
                <p className="mt-2 text-sm font-bold text-slate-800">{course.semester}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50">
                <p className="text-xs font-medium text-slate-500">Statut</p>
                <p className="mt-2 text-sm font-bold text-slate-800">
                  {course.status === "completed" ? "Terminé" : course.status === "in_progress" ? "En cours" : "À venir"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5">
              <div className="flex items-center gap-2 text-slate-800">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h4 className="text-lg font-bold">Description du cours</h4>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{details.description}</p>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-bold text-slate-800">Contenu du cours</h4>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {details.content.map((item) => (
                    <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-slate-50/50"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-800">Examens associés</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {linkedExams.length} actifs
              </span>
              </div>

              <div className="mt-5 space-y-4">
                {linkedExams.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-sm font-medium text-slate-500">
                      Aucun examen actif n’est associé à ce cours.
                    </div>
                ) : (
                    linkedExams.map((exam) => (
                        <div
                            key={exam.id}
                            className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-150 hover:border-blue-200 hover:bg-white hover:shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {exam.title}
                              </p>
                              <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                                <span>{exam.window}</span>
                              </div>
                            </div>
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${examBadgeStyles[exam.status] || "bg-slate-100 text-slate-700"}`}>
                        {examLabel[exam.status] || exam.status}
                      </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Clock3 className="h-3.5 w-3.5 text-slate-400" /> {exam.attempts} tentatives
                      </span>
                            <Link
                                to={`/admin/exams/${exam.id}/results`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold transition-all duration-150 group-hover:bg-blue-50 group-hover:text-blue-700 active:scale-95 cursor-pointer"
                            >
                              <span>Voir les résultats</span>
                              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}