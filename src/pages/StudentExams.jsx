import React from "react";
import { Link } from "react-router-dom";
import { Clock3, ShieldCheck, Lock, Loader2, AlertCircle } from "lucide-react";
import useFetch from "../hooks/useFetch";

const statusStyles = {
    Open: "bg-emerald-100 text-emerald-700",
    "À venir": "bg-amber-100 text-amber-700",
    Upcoming: "bg-amber-100 text-amber-700",
    Closed: "bg-slate-100 text-slate-700",
    Terminé: "bg-slate-100 text-slate-700",
    Ouvert: "bg-emerald-100 text-emerald-700",
    open: "bg-emerald-100 text-emerald-700",
    upcoming: "bg-amber-100 text-amber-700",
    closed: "bg-slate-100 text-slate-700",
};

export default function StudentExams() {
    const { data: examsData, loading, error } = useFetch("/exams");

    const exams = examsData?.exams || examsData || [];

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center p-8">
                <div className="flex items-center gap-3 text-slate-500">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    <span>Loading available exams...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>Error loading exams. Please try again later.</span>
            </div>
        );
    }

    const openExamsCount = exams.filter((exam) => {
        const status = exam.status;
        return status === "Ouvert" || status === "open" || status === "Open";
    }).length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">Exams</p>
                    <h2 className="mt-1 text-3xl font-bold text-slate-800">Available Exams</h2>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{openExamsCount} {openExamsCount === 1 ? "open assessment" : "open assessments"}</span>
                </div>
            </div>

            {exams.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
                    No exams available at the moment.
                </div>
            ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                    {exams.map((exam) => {
                        const rawStatus = exam.status || "Closed";
                        const isOpen = rawStatus === "Ouvert" || rawStatus === "open" || rawStatus === "Open";
                        const isUpcoming = rawStatus === "À venir" || rawStatus === "upcoming" || rawStatus === "Upcoming";

                        const displayStatus = isOpen ? "Open" : isUpcoming ? "Upcoming" : "Closed";
                        const moduleName = exam.module || exam.category || "Module";
                        const title = exam.title || "Untitled Exam";
                        const description = exam.description || "";
                        const duration = exam.duration || "N/A";
                        const difficulty = exam.difficulty || "Standard";
                        const questionsCount = exam.questionsCount ?? exam.questions?.length ?? 0;
                        const dueDate = exam.dueDate || exam.deadline || "N/A";

                        return (
                            <div key={exam.id} className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                                            {moduleName}
                                        </span>
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                                statusStyles[displayStatus] || statusStyles[rawStatus] || "bg-slate-100 text-slate-600"
                                            }`}
                                        >
                                            {displayStatus}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 text-xl font-semibold text-slate-800">{title}</h3>
                                    <p className="mt-2 text-sm text-slate-500">{description}</p>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Duration</p>
                                            <p className="mt-1 font-semibold text-slate-800">{duration}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Difficulty</p>
                                            <p className="mt-1 font-semibold text-slate-800">{difficulty}</p>
                                        </div>
                                        <div className="rounded-xl bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">Questions</p>
                                            <p className="mt-1 font-semibold text-slate-800">{questionsCount}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
                                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm">
                                        <Clock3 className="h-4 w-4 text-slate-400" />
                                        {dueDate}
                                    </span>

                                    {isOpen ? (
                                        <Link
                                            to={`/student/exams/${exam.id}`}
                                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95 cursor-pointer shadow-sm"
                                        >
                                            Start
                                        </Link>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                                            <Lock className="h-3.5 w-3.5" />
                                            Unavailable
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