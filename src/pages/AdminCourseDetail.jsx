import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, Clock3, UserRound, Loader2 } from "lucide-react";
import useFetch from "../hooks/useFetch";

const EXAM_BADGE_STYLES = {
  available: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-blue-100 text-blue-700",
  disabled: "bg-slate-100 text-slate-700",
};

const EXAM_LABELS = {
  available: "Available",
  in_progress: "In Progress",
  completed: "Validated",
  disabled: "Disabled",
};

export default function AdminCourseDetail() {
  const { courseId } = useParams();

  const { data: course, loading: courseLoading, error: courseError } = useFetch(`/courses/${courseId}`);
  const { data: examsData, loading: examsLoading } = useFetch(`/courses/${courseId}/exams`);

  const linkedExams = useMemo(() => {
    if (!examsData) return [];
    return examsData.filter((exam) => exam.status !== "disabled");
  }, [examsData]);

  if (courseLoading) {
    return (
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span>Loading course details...</span>
          </div>
        </div>
    );
  }

  if (courseError || !course) {
    return (
        <div className="p-8 space-y-4">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            Course not found or error loading data from the server.
          </div>
          <Link to="/admin/cours" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
    );
  }

  const details = course.details || {
    description: course.description || "No description available for this course.",
    content: course.content || []
  };

  return (
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-blue-600">Courses</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-800">{course.title}</h2>
          </div>
          <Link to="/admin/cours" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl shadow-sm">
                  {course.icon || <BookOpen className="h-7 w-7 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm text-slate-500">{course.code}</p>
                  <h3 className="text-2xl font-bold text-slate-800">{course.title}</h3>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{course.semester}</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Professor</p>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                  <UserRound className="h-4 w-4 text-blue-600" />
                  {course.professor || "Unassigned"}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Credits</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{course.credits || "-"}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Semester</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{course.semester || "-"}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {course.status === "completed" ? "Completed" : course.status === "in_progress" ? "In Progress" : "Upcoming"}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-700">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <h4 className="text-lg font-semibold">Course Description</h4>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{details.description}</p>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-slate-800">Course Content</h4>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {details.content.length === 0 ? (
                    <p className="text-sm text-slate-500 col-span-2">No detailed content.</p>
                ) : (
                    details.content.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                    ))
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-800">Associated Exams</h3>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              {examsLoading ? "..." : `${linkedExams.length} active`}
            </span>
            </div>

            <div className="mt-5 space-y-4">
              {examsLoading ? (
                  <div className="p-4 text-center text-sm text-slate-500">Loading exams...</div>
              ) : linkedExams.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No active exams are associated with this course.
                  </div>
              ) : (
                  linkedExams.map((exam) => (
                      <div key={exam.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-800">{exam.title}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{exam.window || "Unscheduled"}</span>
                            </div>
                          </div>
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${EXAM_BADGE_STYLES[exam.status] || "bg-slate-100 text-slate-700"}`}>
                      {EXAM_LABELS[exam.status] || exam.status}
                    </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {exam.attempts || 0} attempts</span>
                          <Link to={`/admin/exams/${exam.id}/results`} className="font-medium text-blue-600 hover:text-blue-700">
                            View Results
                          </Link>
                        </div>
                      </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
  );
}