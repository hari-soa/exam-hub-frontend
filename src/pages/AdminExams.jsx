import { Link } from "react-router-dom";
import { CalendarClock, History, Lock, Unlock } from "lucide-react";
import { adminExamList } from "../data/mockData";

const statusStyles = {
    available: "bg-emerald-100 text-emerald-700",
    in_progress: "bg-amber-100 text-amber-700",
    disabled: "bg-slate-100 text-slate-700",
};

const statusLabels = {
    available: "Disponible",
    in_progress: "En cours",
    disabled: "Désactivé",
};

export default function AdminExams() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">Examens</p>
                    <h2 className="mt-1 text-3xl font-bold text-slate-800">Gestion des examens</h2>
                </div>
                <Link
                    to="/admin/exams/history"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 active:scale-95 cursor-pointer self-start sm:self-auto"
                >
                    <History className="h-4 w-4" />
                    Voir l'historique
                </Link>
            </div>

            <div className="grid gap-4">
                {adminExamList.map((exam) => (
                    <div
                        key={exam.id}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                    >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition-transform duration-200 group-hover:scale-105">
                                    <CalendarClock className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-xl font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                                            {exam.title}
                                        </h3>
                                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[exam.status]}`}>
                      {statusLabels[exam.status]}
                    </span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">{exam.course} • {exam.window}</p>
                                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                                        {exam.locked ? <Lock className="h-3.5 w-3.5 text-rose-500" /> : <Unlock className="h-3.5 w-3.5 text-emerald-500" />}
                                        <span>{exam.locked ? "Verrouillé - tentatives déjà enregistrées" : "Édition disponible"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 lg:justify-end w-full lg:w-auto pt-3 border-t border-slate-100 lg:pt-0 lg:border-t-0">
                                <div className="flex-1 lg:flex-none inline-flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-xs sm:text-sm text-slate-600 font-medium text-center">
                                    {exam.attempts} tentatives
                                </div>
                                <Link
                                    to={`/admin/exams/${exam.id}/questions`}
                                    className="flex-1 lg:flex-none inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 active:scale-95 cursor-pointer text-center"
                                >
                                    Questions
                                </Link>
                                <Link
                                    to={`/admin/exams/${exam.id}/results`}
                                    className="flex-1 lg:flex-none inline-flex items-center justify-center rounded-xl bg-blue-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 cursor-pointer text-center"
                                >
                                    Résultats
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}