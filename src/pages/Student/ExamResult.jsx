import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Trophy, ArrowLeft, RotateCcw } from "lucide-react";

export default function ExamResult() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const result = state?.result;

    if (!result) return (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-center">
            <p className="text-red-600 text-sm font-medium">Résultat introuvable.</p>
            <button
                onClick={() => navigate("/student")}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
            >
                Retour aux examens
            </button>
        </div>
    );

    const pct = Math.round((result.score / result.total_points) * 100);

    return (
        <div className="max-w-3xl mx-auto">

            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    Résultat de l'examen
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                    Correction détaillée question par question
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 mb-4 flex flex-col items-center">
                <div className="p-4 bg-sky-50 rounded-2xl mb-4">
                    <Trophy size={32} className="text-blue-600" />
                </div>
                <p className="text-5xl font-black text-slate-800 mb-1">
                    {result.score}
                    <span className="text-2xl text-slate-400 font-semibold">/{result.total_points}</span>
                </p>
                <p className="text-slate-400 text-sm font-medium mb-4">{pct}% de réussite</p>
                <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all duration-700 ${
                            pct >= 50 ? "bg-blue-600" : "bg-red-400"
                        }`}
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {result.corrections?.map((item, idx) => (
                    <div
                        key={idx}
                        className={`bg-white rounded-3xl border shadow-xl p-6 ${
                            item.is_correct ? "border-emerald-200" : "border-red-200"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <p className="font-bold text-slate-800">
                                <span className="text-blue-600 mr-2">Q{idx + 1}.</span>
                                {item.question_text}
                            </p>
                            {item.is_correct
                                ? <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                                : <XCircle size={20} className="text-red-400 shrink-0" />
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                                item.is_correct
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-red-50 text-red-600 border border-red-200"
                            }`}>
                                {item.is_correct
                                    ? <CheckCircle size={14} />
                                    : <XCircle size={14} />
                                }
                                Votre réponse : {item.student_choice_text || "Sans réponse"}
                            </div>

                            {/* Bonne réponse si faux */}
                            {!item.is_correct && (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle size={14} />
                                    Bonne réponse : {item.correct_choice_text}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 mt-6 justify-end">
                <button
                    onClick={() => navigate("/student/results")}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                >
                    <RotateCcw size={14} />
                    Mes résultats
                </button>
                <button
                    onClick={() => navigate("/student")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
                >
                    <ArrowLeft size={14} />
                    Retour aux examens
                </button>
            </div>
        </div>
    );
}