import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Info,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { formatDate, formatDateTime } from "../utils/format";

export default function StudentProfile() {
  const { user } = useAuth();

  const { data: profileData, loading, error } = useFetch("/student/profile");

  const rawProfile = profileData?.profile || profileData || {};

  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState({
    firstName: rawProfile.firstName || "Nassim",
    lastName: rawProfile.lastName || "Bensaid",
    email: rawProfile.email || "nassim.bensaid@campus.fr",
    phone: rawProfile.phone || "+261 34 12 345 67",
    joinedAt: rawProfile.joinedAt || "2024-09-12T10:00:00.000Z",
    level: rawProfile.level || "L1",
    group: rawProfile.group || "11 - Groupe A",
    major: rawProfile.major || "Informatique",
    lastLogin: rawProfile.lastLogin || "2026-05-18T14:32:00.000Z",
    notifications: rawProfile.notifications ?? true,
  });

  const [notifications, setNotifications] = useState(profile.notifications);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (profileData) {
      const nextProfile = {
        firstName: rawProfile.firstName || profile.firstName,
        lastName: rawProfile.lastName || profile.lastName,
        email: user?.email || rawProfile.email || profile.email,
        phone: rawProfile.phone || profile.phone,
        joinedAt: rawProfile.joinedAt || profile.joinedAt,
        level: rawProfile.level || profile.level,
        group: rawProfile.group || profile.group,
        major: rawProfile.major || profile.major,
        lastLogin: rawProfile.lastLogin || profile.lastLogin,
        notifications: rawProfile.notifications ?? profile.notifications,
      };
      setProfile(nextProfile);
      setNotifications(nextProfile.notifications);
    }
  }, [profileData, user]);

  const initials = `${profile.firstName?.[0] || "N"}${profile.lastName?.[0] || "B"}`;

  const savePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword) {
      setPasswordError("Veuillez entrer un nouveau mot de passe.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    try {
      setPasswordError("");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
      setPasswordModalOpen(false);
    } catch (err) {
      setPasswordError("Erreur lors de la mise à jour du mot de passe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-8">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span>Chargement de votre profil...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm flex items-center gap-3">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span>
          Erreur lors du chargement du profil. Veuillez réessayer plus tard.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-slate-50/60 p-8 ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
        <p className="text-sm text-slate-500 mb-6">
          Consultez vos informations académiques et paramètres de compte
        </p>
      </header>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-start gap-4 lg:gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
            {initials}
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-slate-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full ml-2 inline-flex items-center">
                Étudiant
              </span>
            </div>

            <div className="text-sm text-slate-600 space-y-1.5 mt-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>Inscrit le {formatDate(profile.joinedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-700">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Niveau</div>
              <div className="font-medium">{profile.level}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Groupe</div>
              <div className="font-medium">{profile.group}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Filière</div>
              <div className="font-medium">{profile.major}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Informations académiques
            </h3>
          </div>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">Nom complet</span>
              <span className="font-medium text-slate-900">
                {profile.firstName} {profile.lastName}
              </span>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">E-mail institutionnel</span>
              <span className="font-medium text-slate-900">
                {profile.email}
              </span>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">Téléphone</span>
              <span className="font-medium text-slate-900">
                {profile.phone}
              </span>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">Niveau d'études</span>
              <span className="font-medium text-slate-900">
                {profile.level}
              </span>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">Groupe de TD/TP</span>
              <span className="font-medium text-slate-900">
                {profile.group}
              </span>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <span className="text-slate-500">Filière</span>
              <span className="font-medium text-slate-900">
                {profile.major}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Sécurité du compte
            </h3>
          </div>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Mot de passe</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-900">••••••••••</span>
                <button
                  type="button"
                  className="border border-slate-200 text-slate-700 px-3 py-1 rounded-md text-xs hover:bg-slate-50"
                  onClick={() => {
                    setPasswordError("");
                    setPasswordModalOpen(true);
                  }}
                >
                  Changer
                </button>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  ✓
                </span>
                <span className="text-slate-500">Authentification</span>
              </div>
              <span className="font-medium text-emerald-700">Activée</span>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Dernière connexion</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-900">
                  {formatDateTime(profile.lastLogin)}
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex justify-between items-center mb-6">
        <div className="flex items-start gap-3">
          <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <div className="text-sm font-semibold text-slate-800">
              Notifications par email
            </div>
            <div className="text-xs text-slate-500">
              Recevez vos notifications concernant vos examens, résultats et
              mises à jour.
            </div>
          </div>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            aria-label="Notifications par email"
            checked={notifications}
            onChange={() => setNotifications((value) => !value)}
            className="peer sr-only"
          />
          <span
            className={`h-6 w-11 rounded-full transition ${notifications ? "bg-blue-600" : "bg-slate-200"}`}
          />
          <span
            className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifications ? "translate-x-5" : ""}`}
          />
        </label>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 text-sm">
        <Info className="h-4 w-4" />
        <div>
          Pour toute modification de vos informations administratives, veuillez
          contacter l'administration de l'établissement.
        </div>
      </div>

      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={savePassword}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-slate-800">
              Changer le mot de passe
            </h3>

            {passwordError && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                {passwordError}
              </p>
            )}

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      newPassword: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      confirmPassword: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setPasswordModalOpen(false)}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
