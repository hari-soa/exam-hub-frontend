import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, AlertCircle, BookOpen, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/my/results`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setResults(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
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
                    Mes résultats
                </h1>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                    Historique de vos examens passés
                </p>
            </div>

            {results.length === 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-12 flex flex-col items-center text-center">
                    <div className="p-4 bg-sky-50 rounded-2xl mb-4">
                        <Trophy size={32} className="text-blue-600" />
                    </div>
                    <h2 className="font-bold text-slate-800 mb-1">Aucun résultat</h2>
                    <p className="text-slate-400 text-sm">Vous n'avez pas encore passé d'examen.</p>
                    <button
                        onClick={() => navigate("/student")}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
                    >
                        Voir les examens disponibles
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {results.map((result) => {
                    const pct = Math.round((result.score / result.total_points) * 100);
                    return (
                        <div
                            key={result.id}
                            className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 flex items-center justify-between hover:border-blue-200 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-sky-50 rounded-2xl">
                                    <BookOpen size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-slate-800">{result.exam_title}</h2>
                                    <p className="text-slate-400 text-xs mt-0.5">
                                        {new Date(result.submitted_at).toLocaleDateString("fr-FR", {
                                            day: "numeric", month: "long", year: "numeric"
                                        })}
                                    </p>
                                    {/* Barre de score */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-24 bg-slate-100 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full ${pct >= 50 ? "bg-blue-600" : "bg-red-400"}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-600">
                      {result.score}/{result.total_points} pts
                    </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className={`text-2xl font-black ${pct >= 50 ? "text-blue-600" : "text-red-400"}`}>
                                        {pct}%
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {pct >= 50 ? "Réussi" : "Échoué"}
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate(`/student/exams/${result.exam_id}/result`, {
                                        state: { result }
                                    })}
                                    className="p-2 hover:bg-sky-50 rounded-xl transition-all"
                                >
                                    <ChevronRight size={18} className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}