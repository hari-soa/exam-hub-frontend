import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, AlertCircle, CheckCircle, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function TakeExam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/my/exams/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setExam(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [id]);

    const handleSelect = (questionId, choiceId) => {
        setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            const formattedAnswers = Object.entries(answers).map(
                ([question_id, choice_id]) => ({ question_id, choice_id })
            );
            const response = await fetch(`${API_URL}/my/exams/${id}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ answers: formattedAnswers }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            navigate(`/student/exams/${id}/result`, { state: { result: data } });
        } catch (err) {
            setError(err.message);
            setConfirm(false);
        } finally {
            setSubmitting(false);
        }
    };

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

    const answered = Object.keys(answers).length;
    const total = exam?.questions?.length || 0;

    return (
        <div className="max-w-3xl mx-auto">

            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 bg-sky-50 rounded-xl">
                        <BookOpen size={15} className="text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                        {exam?.title}
                    </h1>
                </div>
                <p className="text-sm text-slate-400 font-medium">
                    {answered}/{total} question{total > 1 ? "s" : ""} répondue{answered > 1 ? "s" : ""}
                </p>
                <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${total > 0 ? (answered / total) * 100 : 0}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {exam?.questions?.map((question, idx) => (
                    <div
                        key={question.id}
                        className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6"
                    >
                        <p className="font-bold text-slate-800 mb-4">
                            <span className="text-blue-600 mr-2">Q{idx + 1}.</span>
                            {question.text}
                        </p>
                        <div className="flex flex-col gap-2">
                            {question.choices?.map((choice) => (
                                <button
                                    key={choice.id}
                                    onClick={() => handleSelect(question.id, choice.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                                        answers[question.id] === choice.id
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-sky-50/50"
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                                        answers[question.id] === choice.id
                                            ? "border-blue-600 bg-blue-600"
                                            : "border-slate-300"
                                    }`}>
                                        {answers[question.id] === choice.id && (
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        )}
                                    </div>
                                    {choice.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                {!confirm ? (
                    <button
                        onClick={() => setConfirm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
                    >
                        <Send size={15} />
                        Soumettre l'examen
                    </button>
                ) : (
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 flex flex-col items-center gap-4 w-full">
                        <CheckCircle size={32} className="text-blue-600" />
                        <p className="font-bold text-slate-800 text-center">
                            Confirmer la soumission ?
                        </p>
                        <p className="text-slate-400 text-sm text-center">
                            Vous avez répondu à {answered}/{total} questions. Cette action est irréversible.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirm(false)}
                                className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-70"
                            >
                                {submitting ? "Envoi..." : "Confirmer"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}