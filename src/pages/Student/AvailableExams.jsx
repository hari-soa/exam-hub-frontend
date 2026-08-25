import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Clock, BookOpen, ArrowRight, AlertCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AvailableExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/my/exams`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setExams(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (error) return (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-center gap-3">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto">

            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    Examens disponibles
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                    {exams.length} examen{exams.length > 1 ? "s" : ""} disponible{exams.length > 1 ? "s" : ""}
                </p>
            </div>

            {exams.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-12 flex flex-col items-center text-center">
                    <div className="p-4 bg-sky-50 rounded-2xl mb-4">
                        <ClipboardList size={32} className="text-blue-600" />
                    </div>
                    <h2 className="font-bold text-slate-800 mb-1">Aucun examen disponible</h2>
                    <p className="text-slate-400 text-sm">Revenez plus tard pour voir vos examens.</p>
                </div>
            )}

            <div className="grid gap-4">
                {exams.map((exam) => (
                    <div
                        key={exam.id}
                        className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 flex items-center justify-between hover:border-blue-200 transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-sky-50 rounded-2xl">
                                <BookOpen size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-800 text-base">{exam.title}</h2>
                                <p className="text-slate-400 text-sm mt-0.5">{exam.description}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Clock size={12} />
                                        <span>Jusqu'au {new Date(exam.end_date).toLocaleDateString("fr-FR")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/student/exams/${exam.id}`)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all shrink-0"
                        >
                            Commencer
                            <ArrowRight size={15} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}