import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Eye, Loader2, Search, UserRoundCheck } from 'lucide-react';
import useFetch from "../hooks/useFetch"; // Ajustez le chemin selon votre structure

const statusStyles = {
  available: 'bg-emerald-100 text-emerald-700',
  in_progress: 'bg-amber-100 text-amber-700',
  disabled: 'bg-slate-100 text-slate-700',
};

const statusLabels = {
  available: 'Disponible',
  in_progress: 'En cours',
  disabled: 'Désactivé',
};

export default function AdminResults() {
  const { examId } = useParams();

  // Appels API conformes à la surface de l'API Exam Hub
  const { data: exam, loading: examLoading, error: examError } = useFetch(`/exams/${examId}`);
  const { data: questionsData, loading: questionsLoading } = useFetch(`/exams/${examId}/questions`);
  const { data: resultsData, loading: resultsLoading } = useFetch(`/exams/${examId}/results`);

  const [search, setSearch] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);

  const sourceResults = resultsData?.results || resultsData || [];
  const questions = questionsData?.questions || questionsData || [];

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return sourceResults;
    return sourceResults.filter((result) => 
      `${result.student || result.studentName} ${result.id || result.studentId}`.toLowerCase().includes(query)
    );
  }, [sourceResults, search]);

  const average = sourceResults.length 
    ? sourceResults.reduce((acc, item) => acc + (item.note ?? item.score ?? 0), 0) / sourceResults.length 
    : 0;
  
  const passedCount = sourceResults.filter((item) => (item.note ?? item.score ?? 0) >= 10).length;
  const totalQuestions = questions.length || exam?.questionsCount || 0;

  const handleExportCsv = () => {
    const rows = [
      ['Étudiant', 'ID', 'Tentatives', 'Moyenne', 'Note'],
      ...sourceResults.map((result) => [
        result.student || result.studentName, 
        result.id || result.studentId, 
        result.attempts || 1, 
        `${(result.average ?? result.note ?? 0).toFixed(1)}/20`, 
        `${result.note ?? result.score ?? 0}/20`
      ]),
    ];
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `examen-${examId}-resultats.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (examLoading || resultsLoading || questionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Chargement des résultats de l'examen...</span>
        </div>
      </div>
    );
  }

  if (examError || !exam) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
        Examen introuvable ou erreur lors du chargement des données.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Résultats</p>
          <h2 className="mt-1 text-3xl font-bold text-slate-800">{exam.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Exporter les résultats (CSV)
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Code cours</span>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-700">{exam.courseCode || exam.course}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-800">{exam.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{exam.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Statut</span>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[exam.status] || 'bg-slate-100 text-slate-700'}`}>
                {statusLabels[exam.status] || exam.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              {exam.locked ? 'Verrouillé - tentatives enregistrées' : 'Édition disponible'}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Début</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {exam.startAt ? new Date(exam.startAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Fin</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {exam.endAt ? new Date(exam.endAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Durée</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{exam.duration ? `${exam.duration} min` : 'N/A'}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Questions</p>
            <p className="mt-2 text-sm font-semibold text-slate-800">{totalQuestions} questions</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Moyenne générale</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{average.toFixed(1)}/20</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Participants</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{sourceResults.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Réussites (&ge; 10/20)</p>
          <p className="mt-3 text-3xl font-bold text-slate-800">{passedCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un étudiant..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <UserRoundCheck className="h-4 w-4 text-blue-600" />
            {filteredResults.length} étudiant(s)
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Étudiant</th>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Tentatives</th>
                <th className="px-4 py-3 font-medium">Moyenne</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {filteredResults.map((result) => (
                <tr key={result.id || result.studentId} className="cursor-pointer transition hover:bg-slate-50" onClick={() => setSelectedResult(result)}>
                  <td className="px-4 py-3 font-medium text-slate-800">{result.student || result.studentName}</td>
                  <td className="px-4 py-3">{result.id || result.studentId}</td>
                  <td className="px-4 py-3">{result.attempts || 1}</td>
                  <td className="px-4 py-3">{(result.average ?? result.note ?? 0).toFixed(1)}/20</td>
                  <td className="px-4 py-3 font-semibold text-blue-700">{result.note ?? result.score}/20</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedResult(result);
                      }}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      <Eye className="h-4 w-4" /> Voir la copie
                    </button>
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-sm text-slate-500">Aucun résultat trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedResult && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setSelectedResult(null)} />
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Tentative</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-800">{selectedResult.student || selectedResult.studentName}</h3>
              </div>
              <button type="button" onClick={() => setSelectedResult(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">ID</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{selectedResult.id || selectedResult.studentId}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Note</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{selectedResult.note ?? selectedResult.score}/20</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Tentatives</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{selectedResult.attempts || 1}</p>
                </div>
              </div>

              <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Soumission</p>
                <p className="mt-2 text-sm text-slate-700">
                  {selectedResult.submittedAt 
                    ? new Date(selectedResult.submittedAt).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) 
                    : 'N/A'}
                </p>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const answer = selectedResult.responses?.find((entry) => (entry.questionId === question.id || entry.id === question.id));
                  const selectedChoiceId = answer?.selectedChoiceId ?? answer?.selectedIndex;
                  const isCorrect = answer?.isCorrect;
                  const points = answer?.pointsEarned ?? answer?.points ?? 0;

                  return (
                    <div key={question.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <p className="font-medium text-slate-800">Question {index + 1}</p>
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-slate-600">{question.text || question.statement}</p>

                      <div className="mt-4 space-y-2">
                        {(question.choices || question.options || []).map((choice, optionIndex) => {
                          const choiceId = choice.id ?? optionIndex;
                          const isSelected = selectedChoiceId === choiceId || selectedChoiceId === optionIndex;
                          const isAnswer = choice.isCorrect || optionIndex === question.correctIndex;

                          const tone = isAnswer
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                            : isSelected && !isAnswer
                              ? 'border-rose-200 bg-rose-50 text-rose-800'
                              : 'border-slate-200 bg-slate-50 text-slate-700';

                          return (
                            <div key={choice.id || optionIndex} className={`rounded-xl border p-2.5 text-sm ${tone}`}>
                              <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {choice.text || choice}
                              {isSelected && <span className="ml-2 text-[10px] uppercase tracking-[0.12em] font-semibold">(Choix étudiant)</span>}
                              {isAnswer && <span className="ml-2 text-[10px] uppercase tracking-[0.12em] font-semibold">(Bonne réponse)</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Points : {points}/{question.points}</span>
                        <span>Réponse {isCorrect ? 'correcte' : 'incorrecte'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}