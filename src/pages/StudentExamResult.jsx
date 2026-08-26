import { Link, useParams } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import { studentExamResults } from "../data/mockData";

export default function StudentExamResult() {
  const { examId } = useParams();
  const result = studentExamResults[examId];

  if (!result) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">Aucun résultat disponible pour cet examen.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Résultat</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">{result.examTitle}</h2>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${result.passed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
            {result.passed ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {result.passed ? "Réussi" : "À retravailler"}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Score</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{result.score}/{result.total}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pourcentage</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">{result.percentage}%</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Date</p>
            <p className="mt-2 text-base font-semibold text-slate-800">{result.attemptedAt}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">Correction détaillée</h3>
        <div className="mt-4 space-y-4">
          {result.questions.map((question) => (
            <div key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-800">Question {question.id}</p>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${question.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {question.isCorrect ? "Bonne réponse" : "Incorrect"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{question.text}</p>

              <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                <div className={`rounded-lg border px-3 py-2 ${question.isCorrect ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em]">Votre réponse</p>
                  <p className="mt-1 font-semibold">{question.selected}</p>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
                  <p className="text-[10px] font-medium uppercase tracking-[0.12em]">Bonne réponse</p>
                  <p className="mt-1 font-semibold">{question.correct}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                <span>Points obtenus</span>
                <span className="font-semibold text-slate-800">{question.points ?? 0}/{question.maxPoints ?? question.points ?? 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link to="/student/results" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Voir l’historique
        </Link>
        <Link to="/student" className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Retour aux examens
        </Link>
      </div>
    </div>
  );
}
