import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock3,
  FileCheck2,
  HelpCircle,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { studentExamQuestions, studentExams } from "../data/mockData";

export default function StudentExamTaking() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const exam = studentExams.find((item) => item.id === examId);
  const questions = studentExamQuestions[examId] || [];

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    if (questions.length > 0) {
      const initialAnswers = Object.fromEntries(
          questions.map((q) => [q.id, q.selectedIndex ?? null])
      );
      setAnswers(initialAnswers);
    }
  }, [examId, questions]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!exam) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
          <div className="rounded-full bg-slate-100 p-4 text-slate-400 mb-3">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Examen introuvable</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Cet examen n'existe pas ou n'est plus accessible.
          </p>
        </div>
    );
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    navigate(`/student/exams/${exam.id}/result`);
  };

  const answeredCount = Object.values(answers).filter((val) => val !== null && val !== undefined).length;
  const progressPercentage = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;
  const isTimeCritical = timeLeft < 300;

  return (
      <div className="space-y-8 pb-12">
        <div className="sticky top-4 z-20 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-md backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-100 mb-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Épreuve en cours</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                {exam.title}
              </h2>
            </div>

            <div
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold shadow-sm transition-all ${
                    isTimeCritical
                        ? "bg-rose-50 text-rose-600 border border-rose-200 animate-pulse"
                        : "bg-slate-100 text-slate-800 border border-slate-200/60"
                }`}
            >
              <Clock3 className={`h-4 w-4 ${isTimeCritical ? "text-rose-600" : "text-blue-600"}`} />
              <span>Temps restant : {formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
              <span>Progression : {answeredCount} / {questions.length} questions répondues</span>
              <span className="font-bold text-blue-600">{progressPercentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, questionIndex) => {
            const isAnswered = answers[question.id] !== null && answers[question.id] !== undefined;

            return (
                <div
                    key={question.id}
                    className={`rounded-2xl border p-6 shadow-sm transition-all duration-200 bg-white ${
                        isAnswered ? "border-slate-200/80" : "border-slate-200"
                    }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question {questionIndex + 1} sur {questions.length}
                </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {question.options.length} propositions
                </span>
                  </div>

                  <p className="text-base sm:text-lg font-bold text-slate-900 mb-5">
                    {question.text}
                  </p>

                  <div className="space-y-3" role="radiogroup" aria-label={`Question ${questionIndex + 1}`}>
                    {question.options.map((option, optionIndex) => {
                      const isSelected = answers[question.id] === optionIndex;
                      return (
                          <button
                              key={`${question.id}-opt-${optionIndex}`}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => handleAnswer(question.id, optionIndex)}
                              className={`group flex w-full items-center gap-3.5 rounded-xl border p-4 text-left text-sm font-medium transition-all duration-150 ${
                                  isSelected
                                      ? "border-blue-600 bg-blue-50/60 text-blue-900 shadow-sm"
                                      : "border-slate-200/80 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50/80"
                              }`}
                          >
                      <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                              isSelected
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                          }`}
                      >
                        {String.fromCharCode(65 + optionIndex)}
                      </span>

                            <span className="flex-1">{option}</span>

                            {isSelected && (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                            )}
                          </button>
                      );
                    })}
                  </div>
                </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Progression : {answeredCount}/{questions.length} réponses
          </p>
          <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
          >
            <FileCheck2 className="h-4 w-4" />
            <span>Terminer et soumettre</span>
          </button>
        </div>
      </div>
  );
}