import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  BadgeCheck,
  Calendar,
  ChartColumn,
  Check,
  ChevronRight,
  Eye,
  KeyRound,
  Mail,
  Percent,
  RefreshCcw,
  ShieldCheck,
  ShieldOff,
  Trophy,
  UserCog,
  X,
} from "lucide-react";

const studentTimeline = [
  {
    exam: "Développement Web",
    date: "15/06/2026",
    score: 18,
    total: 20,
    result: "Réussi",
    questions: [
      { id: 1, text: "Hooks React", selected: "useEffect", correct: "useEffect", isCorrect: true, points: 4 },
      { id: 2, text: "React Router", selected: "Link", correct: "Link", isCorrect: true, points: 4 },
      { id: 3, text: "Méthodes HTTP", selected: "POST", correct: "POST", isCorrect: true, points: 4 },
      { id: 4, text: "Axios", selected: "Effectue des requêtes HTTP", correct: "Effectue des requêtes HTTP", isCorrect: true, points: 4 },
      { id: 5, text: "State local", selected: "useState", correct: "useState", isCorrect: true, points: 4 },
    ],
  },
  {
    exam: "Algorithmique 2",
    date: "02/06/2026",
    score: 16,
    total: 20,
    result: "Réussi",
    questions: [
      { id: 1, text: "Tableau associatif", selected: "Tableau associatif", correct: "Tableau associatif", isCorrect: true, points: 4 },
      { id: 2, text: "Arbre binaire", selected: "Hauteur sous-arbres diffère de 1 au plus", correct: "Hauteur sous-arbres diffère de 1 au plus", isCorrect: true, points: 4 },
      { id: 3, text: "Tri rapide", selected: "O(n²)", correct: "O(n²)", isCorrect: true, points: 4 },
      { id: 4, text: "Diviser pour régner", selected: "Tri fusion", correct: "Tri fusion", isCorrect: true, points: 4 },
      { id: 5, text: "Complexité", selected: "O(log n)", correct: "O(n log n)", isCorrect: false, points: 0 },
    ],
  },
  {
    exam: "Réseaux avancés",
    date: "28/05/2026",
    score: 12,
    total: 20,
    result: "Échoué",
    questions: [
      { id: 1, text: "TCP", selected: "Routage sans connexion", correct: "Fiabilité et ordre des paquets", isCorrect: false, points: 0 },
      { id: 2, text: "Socket", selected: "Le port source et destination", correct: "Le port source et destination", isCorrect: true, points: 4 },
      { id: 3, text: "Firewall", selected: "Un système de filtrage de trafic", correct: "Un système de filtrage de trafic", isCorrect: true, points: 4 },
      { id: 4, text: "Vérification", selected: "URL court", correct: "Paquets perdus", isCorrect: false, points: 0 },
      { id: 5, text: "Couches", selected: "Mise en cache", correct: "Transport", isCorrect: false, points: 0 },
    ],
  },
  {
    exam: "Bases de données",
    date: "18/05/2026",
    score: 17,
    total: 20,
    result: "Réussi",
    questions: [
      { id: 1, text: "Clé primaire", selected: "Clé primaire", correct: "Clé primaire", isCorrect: true, points: 4 },
      { id: 2, text: "Normalisation", selected: "La réduction des redondances", correct: "L'organisation des données pour éviter les redondances", isCorrect: true, points: 4 },
      { id: 3, text: "Jointure interne", selected: "Fusionner deux tables selon une condition", correct: "Fusionner deux tables selon une condition", isCorrect: true, points: 4 },
      { id: 4, text: "Langage SQL", selected: "SQL", correct: "SQL", isCorrect: true, points: 4 },
      { id: 5, text: "Index", selected: "Le temps de réponse", correct: "Optimisation de recherche", isCorrect: false, points: 0 },
    ],
  },
];

export default function StudentDetailsDrawer({ student, onClose, onEdit, onToggleStatus, onResetPassword }) {
  const [selectedAttempt, setSelectedAttempt] = useState(studentTimeline[0]);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [resetMessage, setResetMessage] = useState("");

  const performanceHistory = useMemo(
    () => [
      { label: "Mai", value: 12 },
      { label: "Juin", value: 16 },
      { label: "Juil", value: 15 },
      { label: "Août", value: 18 },
      { label: "Sept", value: 17 },
    ],
    [],
  );

  const stats = useMemo(() => {
    const average = (studentTimeline.reduce((sum, item) => sum + item.score, 0) / studentTimeline.length).toFixed(1);
    const validated = studentTimeline.filter((item) => item.result === "Réussi").length;
    const participation = Math.min(100, Math.round((studentTimeline.length / 5) * 100));

    return {
      average: `${average}/20`,
      presence: `${participation}%`,
      validated: `${validated}/${studentTimeline.length}`,
    };
  }, []);

  const handleResetPassword = () => {
    const generated = "Campus@2026!";
    setResetMessage(`Mot de passe réinitialisé pour ${student.name} : ${generated}`);
    onResetPassword?.(student.id, generated);
  };

  const handleToggleStatus = () => {
    const nextStatus = student.status === "active" ? "inactive" : "active";
    onToggleStatus?.({ ...student, status: nextStatus });
  };

  if (!student) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="relative bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-500 p-6 text-white">
          <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/15 p-2 text-white hover:bg-white/20" aria-label="Fermer le profil">
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4 pt-7">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-xl font-bold">
              {student.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Étudiant</p>
              <h3 className="mt-1 truncate text-2xl font-bold">{student.name}</h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-blue-100">
                <span>{student.id}</span>
                <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">
                  {student.status === "active" ? "Actif" : "Non actif"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="space-y-6 p-6">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onEdit?.(student)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                <UserCog className="h-4 w-4" /> Modifier
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <KeyRound className="h-4 w-4" /> Réinitialiser le mot de passe
              </button>
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
                  student.status === "active" ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                {student.status === "active" ? <ShieldOff className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                {student.status === "active" ? "Désactiver" : "Activer"}
              </button>
            </div>

            {resetMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{resetMessage}</div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Moyenne", value: stats.average, icon: Trophy, action: "Voir l'évolution" },
                { label: "Présence", value: stats.presence, icon: Percent, action: "Contrôler la participation" },
                { label: "Validés", value: stats.validated, icon: BadgeCheck, action: "Voir les acquis" },
              ].map(({ label, value, icon: Icon, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setShowAnalytics(true)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
                  title={action}
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-800">{value}</p>
                </button>
              ))}
            </div>

            {showAnalytics && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Évolution des notes</p>
                    <h4 className="mt-1 text-base font-semibold text-slate-800">Progression du profil académique</h4>
                  </div>
                  <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
                    <ChartColumn className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-4 flex h-24 items-end gap-2">
                  {performanceHistory.map((item) => (
                    <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-20 w-full items-end justify-center rounded-t-xl bg-gradient-to-t from-blue-500 to-blue-300/80 px-1" style={{ height: `${item.value * 5}px` }}>
                        <span className="text-[10px] font-semibold text-white">{item.value}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Informations</h4>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <button type="button" className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left hover:bg-slate-100">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{student.email}</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-blue-600">Modifier</span>
                </button>
                <button type="button" className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left hover:bg-slate-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Inscrit le {student.joinedAt}</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-blue-600">Détails</span>
                </button>
                <button type="button" className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left hover:bg-slate-100">
                  <div className="flex items-center gap-3">
                    <ArrowUpRight className="h-4 w-4 text-slate-400" />
                    <span>{student.level || "Niveau L3"} • {student.group || "Groupe A2"}</span>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-blue-600">Inspecter</span>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Historique</h4>
                <span className="text-xs text-slate-500">{studentTimeline.length} examens</span>
              </div>

              <div className="space-y-3">
                {studentTimeline.map((item) => (
                  <button
                    key={item.exam}
                    type="button"
                    onClick={() => setSelectedAttempt(item)}
                    className={`w-full rounded-xl border p-3 text-left transition ${selectedAttempt?.exam === item.exam ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-800">{item.exam}</p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${item.result === "Réussi" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {item.result}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{item.score}/{item.total}</span>
                        <span>{Math.round((item.score / item.total) * 100)}%</span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${(item.score / item.total) * 100}%` }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedAttempt && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Copie détaillée</p>
                    <h4 className="mt-1 text-lg font-semibold text-slate-800">{selectedAttempt.exam}</h4>
                  </div>
                  <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Eye className="h-4 w-4" /> Inspecter
                  </button>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Note finale</span>
                    <span className="font-semibold text-slate-800">{selectedAttempt.score}/{selectedAttempt.total}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Date</span>
                    <span>{selectedAttempt.date}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {selectedAttempt.questions.map((question) => (
                    <div key={question.id} className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-slate-800">Q{question.id}. {question.text}</p>
                        <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${question.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {question.isCorrect ? "Correct" : "Incorrect"}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 text-xs text-slate-600">
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
                          <span>Réponse étudiante</span>
                          <span className={question.isCorrect ? "font-medium text-emerald-700" : "font-medium text-rose-700"}>{question.selected}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
                          <span>Bonne réponse</span>
                          <span className="font-medium text-emerald-700">{question.correct}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5">
                          <span>Points</span>
                          <span className="font-medium text-slate-800">{question.points}/{question.points || 4}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
