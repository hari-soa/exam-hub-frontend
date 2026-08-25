import React, { useState, useEffect } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  Search,
  Filter,
  RotateCcw,
  Plus,
  MoreVertical,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Courses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Programming II",
      code: "PROG2",
      status: "Completed",
      statusType: "completed",
      professor: "Rasolonjatovo M.",
      credits: 6,
      semester: "Semester 2",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      title: "Databases",
      code: "BDD1",
      status: "Completed",
      statusType: "completed",
      professor: "Rajoelina T.",
      credits: 6,
      semester: "Semester 2",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      id: 3,
      title: "Algorithmics",
      code: "ALGO",
      status: "In Progress",
      statusType: "in-progress",
      professor: "Rakotoarivony P.",
      credits: 4,
      semester: "Semester 2",
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      id: 4,
      title: "Networks",
      code: "RES1",
      status: "In Progress",
      statusType: "in-progress",
      professor: "Andriamifidy J.",
      credits: 4,
      semester: "Semester 2",
      iconBg: "bg-rose-50 text-rose-500",
    },
    {
      id: 5,
      title: "Discrete Mathematics",
      code: "MATH1",
      status: "Completed",
      statusType: "completed",
      professor: "Razanadrasoa F.",
      credits: 4,
      semester: "Semester 1",
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      id: 6,
      title: "Operating Systems",
      code: "SYS1",
      status: "In Progress",
      statusType: "in-progress",
      professor: "Ramanantsoa H.",
      credits: 6,
      semester: "Semester 2",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      id: 7,
      title: "Computer Security",
      code: "SEC1",
      status: "Upcoming",
      statusType: "upcoming",
      professor: "Rakotomalala A.",
      credits: 4,
      semester: "Semester 3",
      iconBg: "bg-teal-50 text-teal-600",
    },
    {
      id: 8,
      title: "Web Development",
      code: "WEB1",
      status: "In Progress",
      statusType: "in-progress",
      professor: "Randrianarisoa L.",
      credits: 6,
      semester: "Semester 2",
      iconBg: "bg-sky-50 text-sky-600",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

      try {
        const response = await fetch(`${apiUrl}/admin/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedSemester("All Semesters");
    setSelectedStatus("All Status");
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester =
      selectedSemester === "All Semesters" ||
      course.semester === selectedSemester;
    const matchesStatus =
      selectedStatus === "All Status" || course.status === selectedStatus;

    return matchesSearch && matchesSemester && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Courses</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage the teaching units (UE) of the platform.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm self-start sm:self-auto cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add a course</span>
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800">48</span>
            <p className="text-xs font-medium text-slate-500">Total courses</p>
            <span className="text-[10px] text-slate-400">All courses</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800">28</span>
            <p className="text-xs font-medium text-slate-500">Completed</p>
            <span className="text-[10px] text-emerald-600 font-medium">
              58.3% of total
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800">18</span>
            <p className="text-xs font-medium text-slate-500">In progress</p>
            <span className="text-[10px] text-slate-400">37.5% of total</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-800">2</span>
            <p className="text-xs font-medium text-slate-500">Upcoming</p>
            <span className="text-[10px] text-slate-400">4.2% of total</span>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-600">
            <span className="text-slate-400">Filter by semester</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option>All Semesters</option>
              <option>Semester 1</option>
              <option>Semester 2</option>
              <option>Semester 3</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-600">
            <span className="text-slate-400">Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent focus:outline-none font-medium cursor-pointer"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>Upcoming</option>
            </select>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer ml-auto lg:ml-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative group"
          >
            {}
            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                  course.statusType === "completed"
                    ? "bg-emerald-100 text-emerald-700"
                    : course.statusType === "in-progress"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {course.status}
              </span>
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Icon & Title */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div
                className={`w-14 h-14 rounded-2xl ${course.iconBg} flex items-center justify-center shrink-0 shadow-sm`}
              >
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  {course.title}
                </h3>
                <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                  {course.code}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Professor</span>
                </div>
                <span className="font-medium text-slate-700 truncate max-w-[120px]">
                  {course.professor}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span className="text-slate-400">Credits</span>
                <span className="font-bold text-slate-700">
                  {course.credits}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.semester}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm gap-4 text-xs text-slate-500">
        <span>Showing 1 to 8 of 48 courses</span>

        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center shadow-sm cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium flex items-center justify-center transition-colors cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium flex items-center justify-center transition-colors cursor-pointer">
            3
          </button>
          <span className="px-2 text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium flex items-center justify-center transition-colors cursor-pointer">
            6
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};