import { useMemo, useState } from "react";
import { AlertTriangle, Sparkles, TrendingDown, Search, Loader2 } from "lucide-react";
import useFetch from "../hooks/useFetch";

const STATUS_STYLES = {
  available: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  disabled: "bg-slate-100 text-slate-700",
};

const STATUS_LABELS = {
  available: "Available",
  in_progress: "In Progress",
  disabled: "Disabled",
};

export default function AdminExamHistory() {
  const { data: examHistoryData, loading, error } = useFetch("/admin/exams/history");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");

  const exams = useMemo(() => examHistoryData || [], [examHistoryData]);

  const insights = useMemo(() => {
    if (!exams.length) return [];

    const databaseExam = exams.find((exam) => exam.courseCode === "DB-220");
    const disabledCount = exams.filter(
        (exam) => exam.status === "disabled" && exam.attempts === 0
    ).length;
    const algorithmicExam = exams.find((exam) => exam.courseCode === "CS-101");

    return [
      {
        kind: "warning",
        title: "Performance Alert",
        description: databaseExam
            ? `The pass rate in ${databaseExam.title} is down 12% compared to last month. Consider reviewing the difficulty level of the questions.`
            : "The overall pass rate appears stable. Monitor subjects where the pass rate drops below 50%.",
        icon: TrendingDown,
      },
      {
        kind: "info",
        title: "Optimization",
        description:
            disabledCount > 0
                ? `${disabledCount} exam(s) are currently disabled and have received no attempts. Consider archiving them or updating their availability window.`
                : "No disabled exams remain without attempts. The exam portfolio is well balanced.",
        icon: AlertTriangle,
      },
      {
        kind: "suggestion",
        title: "Proactive Suggestion",
        description: algorithmicExam
            ? `Participation in ${algorithmicExam.title} is high (${algorithmicExam.attempts} attempts). Consider creating an advanced-level exam for this course.`
            : "Participation in certain courses is strong. Consider offering an advanced-level exam for high-demand modules.",
        icon: Sparkles,
      },
    ];
  }, [exams]);

  const filteredExams = useMemo(() => {
    const query = search.trim().toLowerCase();
    return exams.filter((exam) => {
      const matchesSearch =
          query === "" ||
          (exam.title || "").toLowerCase().includes(query) ||
          (exam.courseCode || "").toLowerCase().includes(query) ||
          (exam.course || "").toLowerCase().includes(query);

      const matchesStatus = statusFilter === "all" || exam.status === statusFilter;
      const matchesSemester = semesterFilter === "all" || exam.semester === semesterFilter;

      return matchesSearch && matchesStatus && matchesSemester;
    });
  }, [exams, search, semesterFilter, statusFilter]);

  const uniqueSemesters = useMemo(() => {
    return [...new Set(exams.map((exam) => exam.semester).filter(Boolean))];
  }, [exams]);

  if (loading) {
    return (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span>Loading exam history...</span>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="p-8 space-y-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            Error loading exam history from the server.
          </div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Exams</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">Complete History</h2>
          </div>
        </div>

        {insights.length > 0 && (
            <div className="grid gap-4 xl:grid-cols-3">
              {insights.map(({ kind, title, description, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              kind === "warning"
                                  ? "bg-amber-100 text-amber-600"
                                  : kind === "info"
                                      ? "bg-blue-100 text-blue-600"
                                      : "bg-emerald-100 text-emerald-600"
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{title}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{description}</p>
                  </div>
              ))}
            </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search exam (title, code, course)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="available">Available</option>
                <option value="in_progress">In Progress</option>
                <option value="disabled">Disabled</option>
              </select>

              <select
                  value={semesterFilter}
                  onChange={(event) => setSemesterFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-300 focus:bg-white"
              >
                <option value="all">All Semesters</option>
                {uniqueSemesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Exam</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Course Code</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Date</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap text-center">Attempts</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap min-w-[150px]">Pass Rate</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Semester</th>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Status</th>
              </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {filteredExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div>
                        <p className="font-semibold text-slate-800">{exam.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{exam.course}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle font-medium text-slate-600">
                      {exam.courseCode}
                    </td>
                    <td className="px-6 py-4 align-middle whitespace-nowrap">{exam.date}</td>
                    <td className="px-6 py-4 align-middle text-center">{exam.attempts}</td>
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-full max-w-[100px] overflow-hidden rounded-full bg-slate-100">
                          <div
                              className="h-full rounded-full bg-blue-500"
                              style={{ width: `${Math.min(100, Math.max(0, exam.successRate || 0))}%` }}
                          />
                        </div>
                        <span className="font-medium text-slate-700">{exam.successRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle text-slate-600 whitespace-nowrap">
                      {exam.semester}
                    </td>
                    <td className="px-6 py-4 align-middle whitespace-nowrap">
                    <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            STATUS_STYLES[exam.status] || "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {STATUS_LABELS[exam.status] || exam.status}
                    </span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>

            {filteredExams.length === 0 && (
                <div className="p-8 text-center text-sm text-slate-500">
                  No exams match the current filters.
                </div>
            )}
          </div>
        </div>
      </div>
  );
}