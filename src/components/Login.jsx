import React, { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Laptop,
  BookOpen,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const CONTAINER_STYLE =
  "min-h-screen flex items-center justify-center bg-amber-50/40 p-4 relative overflow-hidden font-sans";
const DECORATIVE_CIRCLE_TOP =
  "absolute -top-10 -left-10 w-40 h-40 bg-amber-100/50 rounded-full blur-xl pointer-events-none";
const DECORATIVE_CIRCLE_BOTTOM =
  "absolute -bottom-10 -right-10 w-60 h-60 bg-blue-100/50 rounded-full blur-2xl pointer-events-none";

const CARD_STYLE =
  "max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-100 z-10";

const LEFT_PANEL_STYLE =
  "bg-sky-50/60 p-8 sm:p-12 flex flex-col items-center justify-between text-center relative border-r border-slate-100";
const BRAND_LOGO_CONTAINER = "flex flex-col items-center gap-3 mt-4";
const BRAND_ICON_WRAPPER =
  "p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 text-white";
const BRAND_TITLE_STYLE =
  "text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5";
const BRAND_HIGHLIGHT_STYLE = "text-blue-600";
const BRAND_TAGLINE_STYLE =
  "text-sm text-slate-500 font-medium max-w-xs mt-3 leading-relaxed";

const ILLUSTRATION_CONTAINER =
  "my-8 w-full max-w-xs relative flex flex-col items-center justify-center";
const LAPTOP_ILLUSTRATION_STYLE =
  "w-48 h-32 bg-slate-800 rounded-t-xl p-2 relative shadow-2xl border-2 border-slate-700";
const LAPTOP_SCREEN_STYLE =
  "w-full h-full bg-white rounded flex flex-col p-2 justify-center gap-1.5 border border-slate-200";
const LAPTOP_BASE_STYLE = "w-60 h-3 bg-slate-700 rounded-b-xl shadow-md";
const BOOK_STACK_STYLE = "absolute -bottom-1 -left-4 flex flex-col gap-1";

// Panneau Droit (Formulaire de connexion)
const RIGHT_PANEL_STYLE = "p-8 sm:p-12 flex flex-col justify-center bg-white";
const FORM_HEADER_STYLE = "text-center mb-6";
const HEADING_STYLE = "text-2xl font-bold text-slate-800 tracking-tight";
const SUBHEADING_STYLE = "text-sm text-slate-400 mt-1";

const ERROR_BOX_STYLE =
  "p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl text-center mb-4";

const FORM_STYLE = "flex flex-col gap-4";
const GROUP_STYLE = "flex flex-col gap-1.5";
const LABEL_STYLE = "text-xs font-semibold text-slate-700";

const INPUT_WRAPPER_STYLE = "relative flex items-center";
const INPUT_ICON_STYLE = "absolute left-3.5 text-slate-400 w-4 h-4";
const INPUT_STYLE =
  "w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";
const TOGGLE_PASSWORD_STYLE =
  "absolute right-3.5 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors";

const OPTIONS_ROW_STYLE = "flex items-center justify-between text-xs mt-1";
const CHECKBOX_LABEL_STYLE =
  "flex items-center gap-2 text-slate-500 cursor-pointer select-none";
const FORGOT_PASSWORD_STYLE =
  "text-blue-600 hover:text-blue-700 font-semibold transition-colors";

const BUTTON_STYLE =
  "w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 disabled:opacity-70";

const DIVIDER_CONTAINER = "relative my-6 text-center";
const DIVIDER_LINE = "absolute inset-0 flex items-center";
const DIVIDER_LINE_INNER = "w-full border-t border-slate-100";
const DIVIDER_TEXT_WRAPPER =
  "relative bg-white px-3 text-xs text-slate-300 font-medium";

const INFO_BOX_STYLE =
  "p-3 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center gap-3 text-xs text-sky-700";

export const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onLoginSuccess) {
        onLoginSuccess(data.token, data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={CONTAINER_STYLE}>
      <div className={DECORATIVE_CIRCLE_TOP}></div>
      <div className={DECORATIVE_CIRCLE_BOTTOM}></div>

      <div className={CARD_STYLE}>
        {}
        <div className={LEFT_PANEL_STYLE}>
          <div className={BRAND_LOGO_CONTAINER}>
            <div className={BRAND_ICON_WRAPPER}>
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className={BRAND_TITLE_STYLE}>
              Exam <span className={BRAND_HIGHLIGHT_STYLE}>Hub</span>
            </h1>
            <div className="w-8 h-0.5 bg-blue-500 rounded-full my-1"></div>
            <p className={BRAND_TAGLINE_STYLE}>
              Take your exams simply, quickly, and with total security.
            </p>
          </div>

          <div className={ILLUSTRATION_CONTAINER}>
            <div className={LAPTOP_ILLUSTRATION_STYLE}>
              <div className={LAPTOP_SCREEN_STYLE}>
                <div className="w-3/4 h-1.5 bg-blue-100 rounded"></div>
                <div className="w-1/2 h-1.5 bg-blue-100 rounded"></div>
                <div className="w-2/3 h-1.5 bg-blue-100 rounded"></div>
              </div>
            </div>
            <div className={LAPTOP_BASE_STYLE}></div>

            <div className={BOOK_STACK_STYLE}>
              <div className="w-12 h-2.5 bg-emerald-400 rounded-sm shadow-sm"></div>
              <div className="w-14 h-2.5 bg-amber-400 rounded-sm shadow-sm"></div>
              <div className="w-16 h-2.5 bg-sky-500 rounded-sm shadow-sm"></div>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            &copy; 2026 Exam Hub Platform
          </div>
        </div>

        {}
        <div className={RIGHT_PANEL_STYLE}>
          <div className={FORM_HEADER_STYLE}>
            <h2 className={HEADING_STYLE}>Welcome back!</h2>
            <p className={SUBHEADING_STYLE}>Please log in to your account</p>
          </div>

          {error && <div className={ERROR_BOX_STYLE}>{error}</div>}

          <form onSubmit={handleSubmit} className={FORM_STYLE}>
            <div className={GROUP_STYLE}>
              <label className={LABEL_STYLE} htmlFor="email">
                Email
              </label>
              <div className={INPUT_WRAPPER_STYLE}>
                <Mail className={INPUT_ICON_STYLE} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className={INPUT_STYLE}
                  required
                />
              </div>
            </div>

            <div className={GROUP_STYLE}>
              <label className={LABEL_STYLE} htmlFor="password">
                Password
              </label>
              <div className={INPUT_WRAPPER_STYLE}>
                <Lock className={INPUT_ICON_STYLE} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className={INPUT_STYLE}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={TOGGLE_PASSWORD_STYLE}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className={OPTIONS_ROW_STYLE}>
              <label className={CHECKBOX_LABEL_STYLE}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                Remember me
              </label>
              <a href="#forgot" className={FORGOT_PASSWORD_STYLE}>
                Forgot password?
              </a>
            </div>

            <button type="submit" disabled={loading} className={BUTTON_STYLE}>
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className={DIVIDER_CONTAINER}>
            <div className={DIVIDER_LINE}>
              <div className={DIVIDER_LINE_INNER}></div>
            </div>
            <div className={DIVIDER_TEXT_WRAPPER}>
              <span>or</span>
            </div>
          </div>

          <div className={INFO_BOX_STYLE}>
            <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
            <span>
              Student accounts are created exclusively by the system
              administrator.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
