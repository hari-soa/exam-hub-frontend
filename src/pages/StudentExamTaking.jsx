import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Clock3, FileCheck2 } from "lucide-react";
import { studentExamQuestions, studentExams } from "../data/mockData";

export default function StudentExamTaking() {
  const navigate = useNavigate();
  const { examId } = useParams();
  const exam = studentExams.find((item) => item.id === examId);
  const questions = studentExamQuestions[examId] || [];

  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(questions.map((question) => [question.id, question.selectedIndex ?? 0])),
  );
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!exam) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-600">Examen introuvable.</div>;
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

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Passage</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">{exam.title}</h2>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
            <Clock3 className="h-4 w-4 text-blue-600" />
            Temps restant : {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Question {questionIndex + 1}</p>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{question.options.length} choix</span>
            </div>
            <p className="text-lg font-medium text-slate-800">{question.text}</p>

            <div className="mt-4 space-y-3">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                return (
                  <button
                    key={`${question.id}-${option}`}
                    type="button"
                    onClick={() => handleAnswer(question.id, optionIndex)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm transition ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-500"}`}>
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Progression: {Object.keys(answers).length}/{questions.length} réponses</p>
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <FileCheck2 className="h-4 w-4" />
          Soumettre le questionnaire
        </button>
      </div>
    </div>
  );
}
