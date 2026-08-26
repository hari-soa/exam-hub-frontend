import React from "react";
import { Link } from "react-router-dom";
import { Clock3, ShieldCheck, Lock } from "lucide-react";
import { studentExams } from "../data/mockData";

const statusStyles = {
    Ouvert: "bg-emerald-100 text-emerald-700",
    "À venir": "bg-amber-100 text-amber-700",
    Terminé: "bg-slate-100 text-slate-700",
};

export default function StudentExams() {
    const openExamsCount = studentExams?.filter((exam) => exam.status === "Ouvert").length || 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">Examens</p>
                    <h2 className="mt-1 text-3xl font-bold text-slate-800">Examens disponibles</h2>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{openExamsCount} {openExamsCount > 1 ? "évaluations ouvertes" : "évaluation ouverte"}</span>
                </div>
            </div>

            {!studentExams || studentExams.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
                    Aucun examen n'est disponible pour le moment.
                </div>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {studentExams.map((exam) => {
                        const isOpen = exam.status === "Ouvert";

                        return (
                            <div key={exam.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                      {exam.module}
                    </span>
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                                statusStyles[exam.status] || "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                      {exam.status}
                    </span>
                                    </div>

                                    <h3 className="mt-4 text-xl font-semibold text-slate-800">{exam.title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{exam.description}</p>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Durée</p>
                                            <p className="mt-1 font-semibold text-slate-800">{exam.duration}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Niveau</p>
                                            <p className="mt-1 font-semibold text-slate-800">{exam.difficulty}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Questions</p>
                                            <p className="mt-1 font-semibold text-slate-800">{exam.questionsCount}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                    <Clock3 className="h-4 w-4 text-slate-400" />
                      {exam.dueDate}
                  </span>

                                    {isOpen ? (
                                        <Link
                                            to={`/student/exams/${exam.id}`}
                                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
                                        >
                                            Commencer
                                        </Link>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                      <Lock className="h-3.5 w-3.5" />
                      Indisponible
                    </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}