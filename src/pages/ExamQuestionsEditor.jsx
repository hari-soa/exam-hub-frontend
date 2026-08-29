import { Link, useParams } from "react-router-dom";
import { Lock, Plus, ShieldAlert, Loader2 } from "lucide-react";
import useFetch from "../hooks/useFetch";

export default function ExamQuestionsEditor() {
  const { examId } = useParams();

  const {
    data: exam,
    loading: examLoading,
    error: examError,
  } = useFetch(`/exams/${examId}`);
  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useFetch(`/exams/${examId}/questions`);

  const questions = questionsData?.questions || questionsData || [];

  if (examLoading || questionsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Chargement des questions de l'examen...</span>
        </div>
      </div>
    );
  }

  if (examError || questionsError || !exam) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700">
        Examen introuvable ou erreur lors du chargement des données.
      </div>
    );
  }

  // Vérification de l'état de verrouillage (RG-08)
  const isLocked = exam.locked || exam.hasAttempts;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-blue-600">Éditeur</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">
            Questions de l’examen
          </h2>
        </div>
        <Link
          to="/admin/exams"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Retour à la liste
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold text-slate-800">{exam.title}</p>
            <p className="mt-1 text-sm text-slate-500">
              {questions.length} questions • Mode QCM
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLocked ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">
                <Lock className="h-3.5 w-3.5" />
                Verrouillé
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <Plus className="h-3.5 w-3.5" />
                Modifiable
              </span>
            )}
          </div>
        </div>

        {isLocked && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              L’éditeur est verrouillé, car cet examen a déjà des tentatives
              enregistrées. Les questions restent en lecture seule.
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => {
          const options = question.options || question.choices || [];
          const correctIndex =
            question.correctIndex ?? question.correctChoiceIndex ?? 0;

          return (
            <div
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Question {index + 1}
                </p>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {question.points} pts
                </span>
              </div>
              <p className="text-base font-medium text-slate-800">
                {question.text || question.statement}
              </p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {options.map((option, optionIndex) => {
                  const optionText =
                    typeof option === "string"
                      ? option
                      : option.text || option.label;
                  const isCorrect =
                    optionIndex === correctIndex || option.isCorrect;

                  return (
                    <div
                      key={`${question.id}-${optionIndex}`}
                      className={`rounded-xl border px-3 py-2 text-sm ${
                        isCorrect
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>{" "}
                      {optionText}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {questions.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Aucune question enregistrée pour cet examen.
          </div>
        )}
      </div>
    </div>
  );
}
