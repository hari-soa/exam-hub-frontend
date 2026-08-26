import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Award,
  Calendar,
  Target,
  HelpCircle,
  BookOpen
} from "lucide-react";
import { studentExamResults } from "../data/mockData";

export default function StudentExamResult() {
  const { examId } = useParams();
  const result = studentExamResults[examId];
  if (!result) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
          <div className="rounded-full bg-slate-100 p-4 text-slate-400 mb-3">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Résultat introuvable</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Aucun résultat n'est disponible pour cet examen ou le lien est invalide.
          </p>
          <Link
              to="/student/results"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l'historique
          </Link>
        </div>
    );
  }

  return (
      <div className="space-y-8 pb-8">
        <div>
          <Link
              to="/student/results"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux résultats
          </Link>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100 mb-2">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Copie corrigée</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {result.examTitle}
                </h2>
              </div>

              <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border ${
                      result.passed
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-rose-50 text-rose-700 border-rose-200/60"
                  }`}
              >
                {result.passed ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-rose-600" />}
                <span>{result.passed ? "Examen Réussi" : "À retravailler"}</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Note globale</span>
                  <Award className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-slate-900">{result.score}</span>
                  <span className="text-sm font-medium text-slate-400">/ {result.total} pts</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Pourcentage</span>
                  <Target className="h-4 w-4 text-slate-400" />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{result.percentage}%</p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wider">Date de passage</span>
                  <Calendar className="h-4 w-4 text-slate-400" />
                </div>
                <p className="text-base font-bold text-slate-800 mt-1">{result.attemptedAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <h3 className="text-base font-bold text-slate-900">
              Détail des questions ({result.questions?.length || 0})
            </h3>
          </div>

          <div className="space-y-6">
            {result.questions.map((question, index) => (
                <div
                    key={question.id}
                    className={`rounded-2xl border p-5 transition-all duration-150 ${
                        question.isCorrect
                            ? "border-slate-200/80 bg-white hover:border-emerald-200"
                            : "border-slate-200/80 bg-white hover:border-rose-200"
                    }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {index + 1}
                </span>
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            question.isCorrect
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : "bg-rose-50 text-rose-700 border border-rose-200/60"
                        }`}
                    >
                  {question.isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Correct
                      </>
                  ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        Incorrect
                      </>
                  )}
                </span>
                  </div>

                  <p className="text-base font-semibold text-slate-800 mb-4">
                    {question.text}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div
                        className={`rounded-xl border p-3.5 ${
                            question.isCorrect
                                ? "border-emerald-200/60 bg-emerald-50/40 text-emerald-900"
                                : "border-rose-200/60 bg-rose-50/40 text-rose-900"
                        }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Votre réponse
                      </p>
                      <p className="text-sm font-semibold">{question.selected}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/40 p-3.5 text-emerald-900">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">
                        Bonne réponse
                      </p>
                      <p className="text-sm font-semibold">{question.correct}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-2 text-xs font-medium text-slate-600">
                    <span>Points attribués</span>
                    <span className="font-bold text-slate-900">
                  {question.points ?? 0} / {question.maxPoints ?? question.points ?? 0} pt{question.maxPoints > 1 ? "s" : ""}
                </span>
                  </div>
                </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
              to="/student/results"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Voir l’historique
          </Link>
          <Link
              to="/student"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Retour aux examens
          </Link>
        </div>
      </div>
  );
}