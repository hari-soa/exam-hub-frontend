// src/App.jsx
import React, { useState, useEffect } from "react";
// import { Login } from "./components/Login";

// --- AJOUT DES STYLES NÉCESSAIRES ---
const CONTAINER_STYLE = "min-h-screen bg-slate-50 text-slate-800 font-sans flex"; // <-- 'flex' ajouté ici pour mettre la sidebar à gauche
const NAV_STYLE =
  "bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm";
const BRAND_STYLE = "text-xl font-bold text-slate-800 flex items-center gap-2";
const BRAND_SPAN_STYLE = "text-blue-600";
const USER_INFO_STYLE = "flex items-center gap-4 text-sm";
const ROLE_BADGE_STYLE =
  "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
const LOGOUT_BTN_STYLE =
  "px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg hover:border-red-200 transition-colors cursor-pointer";

const MAIN_CONTENT_STYLE = "max-w-7xl mx-auto p-6 flex-1";

// --- IMPORTATION DES VUES ---
import { Dashboard } from "./components/Dashboard";
import { Courses } from "./components/Courses";

export default function App() {
  // AJOUT DE L'ÉTAT POUR GÉRER LES ONGLETS DE LA SIDEBAR
  const [currentTab, setCurrentTab] = useState("courses");

  // 1. On FORGE un token factice pour le test
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const [token, setToken] = useState("faux_token_de_test_sécurisé");

  // 2. On FORGE un utilisateur factice avec le rôle "admin"
  /*
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  */
  const [user, setUser] = useState({
    first_name: "Admin",
    last_name: "Test",
    role: "admin",
  });

  // 3. On commente le useEffect qui nettoie la session si pas de token
  /*
  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [token]);
  */

  const handleLoginSuccess = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  // 4. On commente la redirection obligatoire vers le Login
  /*
  if (!token || !user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }
  */

  return (
    <div className={CONTAINER_STYLE}>
      
      {/* ================= BARRE LATÉRALE (SIDEBAR) ================= */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 min-h-screen">
        <div className="space-y-6">
          <div className={BRAND_STYLE}>
            Exam <span className={BRAND_SPAN_STYLE}>Hub</span>
          </div>

          <nav className="flex flex-col gap-1 text-sm font-medium">
            <button
              onClick={() => setCurrentTab("dashboard")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                currentTab === "dashboard"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              📊 Tableau de bord
            </button>
            <button
              onClick={() => setCurrentTab("students")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              👥 Étudiants
            </button>
            <button
              onClick={() => setCurrentTab("courses")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                currentTab === "courses"
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              📚 Cours
            </button>
            <button
              onClick={() => setCurrentTab("exams")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              📝 Examens
            </button>
            <button
              onClick={() => setCurrentTab("stats")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer text-left"
            >
              📈 Statistiques
            </button>
          </nav>
        </div>

        <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
          🚪 Déconnexion
        </button>
      </aside>
      {/* ============================================================ */}

      {/* ZONE PRINCIPALE (A DROITE DE LA SIDEBAR) */}
      <div className="flex-1 flex flex-col">
        <nav className={NAV_STYLE}>
          <div className="text-sm font-medium text-slate-500">Espace Administration</div>
          <div className={USER_INFO_STYLE}>
            <span className="font-medium">
              {user.first_name} {user.last_name}
            </span>
            <span
              className={`${ROLE_BADGE_STYLE} ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {user.role}
            </span>
            <button onClick={handleLogout} className={LOGOUT_BTN_STYLE}>
              Sign Out
            </button>
          </div>
        </nav>

        <main className={MAIN_CONTENT_STYLE}>
          {user.role === "admin" ? (
            <div>
              {/* Affichage dynamique des modules reliés aux clics de la sidebar */}
              {currentTab === "dashboard" && <Dashboard user={user} />}
              {currentTab === "courses" && <Courses />}
              {currentTab !== "dashboard" && currentTab !== "courses" && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h1 className="text-2xl font-bold mb-2 capitalize">{currentTab} Module</h1>
                  <p className="text-sm text-slate-500">This section is currently under development.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Student Workspace</h1>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}