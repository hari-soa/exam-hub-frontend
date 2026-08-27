import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Lock, Plus, ShieldAlert, HelpCircle } from "lucide-react";
import { examQuestionsByExam } from "../data/mockData";

export default function ExamQuestionsEditor() {
    const { examId } = useParams();
    const exam = examQuestionsByExam[examId];

    if (!exam) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
                Examen introuvable.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-blue-600">Éditeur</p>
                    <h2 className="mt-1 text-3xl font-bold text-slate-800">Questions de l’examen</h2>
                </div>
                <Link
                    to="/admin/exams"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Retour à la liste
                </Link>
            </div>

            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xl font-semibold text-slate-800 transition-colors group-hover:text-blue-600">
                            {exam.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">{exam.questions.length} questions • Mode QCM</p>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        {exam.locked ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
                <Lock className="h-3.5 w-3.5" />
                Verrouillé
              </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Plus className="h-3.5 w-3.5" />
                Modifiable
              </span>
                        )}
                    </div>
                </div>

                {exam.locked && (
                    <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-800 transition-colors hover:bg-amber-50">
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <span>
              L’éditeur est verrouillé car cet examen a déjà des tentatives enregistrées. Les questions restent en lecture seule.
            </span>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {exam.questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                    >
                        <div className="mb-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <HelpCircle className="h-4 w-4 text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                                    Question {index + 1}
                                </p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
                {question.points} {question.points > 1 ? "pts" : "pt"}
              </span>
                        </div>

                        <p className="text-base font-semibold text-slate-800 leading-relaxed">{question.text}</p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {question.options.map((option, optionIndex) => {
                                const isCorrect = optionIndex === question.correctIndex;
                                return (
                                    <div
                                        key={`${question.id}-${option}`}
                                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                            isCorrect
                                                ? "border-emerald-200 bg-emerald-50/80 text-emerald-800 shadow-xs hover:bg-emerald-100/70"
                                                : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                                        }`}
                                    >
                    <span
                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                            isCorrect
                                ? "bg-emerald-200/80 text-emerald-900"
                                : "bg-slate-200/70 text-slate-600"
                        }`}
                    >
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                                        <span className="leading-tight">{option}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}