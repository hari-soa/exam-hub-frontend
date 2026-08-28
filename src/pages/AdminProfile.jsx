import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  Building,
  Info,
  Loader2,
  AlertCircle,
  Save,
  Edit3
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useFetch from "../hooks/useFetch";
import { formatDate, formatDateTime } from '../utils/format';

export default function AdminProfile() {
  const { user } = useAuth();
  
  // Appel API backend pour récupérer les informations du profil administrateur
  const { data: profileData, loading, error } = useFetch('/admin/profile');

  const rawProfile = profileData?.profile || profileData || {};

  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [profile, setProfile] = useState({
    firstName: rawProfile.firstName || 'Admin',
    lastName: rawProfile.lastName || 'Principal',
    email: rawProfile.email || 'admin@examhub.edu',
    phone: rawProfile.phone || '+261 34 00 000 00',
    joinedAt: rawProfile.joinedAt || '2023-01-10T10:00:00.000Z',
    role: rawProfile.role || 'Administrateur Système',
    department: rawProfile.department || 'Direction des Examens & IT',
    lastLogin: rawProfile.lastLogin || '2026-08-28T08:15:00.000Z',
  });

  const [formData, setFormData] = useState(profile);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(timer);
  }, []);

  // Synchronisation des données distantes lorsqu'elles sont chargées
  useEffect(() => {
    if (profileData) {
      const nextProfile = {
        firstName: rawProfile.firstName || profile.firstName,
        lastName: rawProfile.lastName || profile.lastName,
        email: user?.email || rawProfile.email || profile.email,
        phone: rawProfile.phone || profile.phone,
        joinedAt: rawProfile.joinedAt || profile.joinedAt,
        role: rawProfile.role || profile.role,
        department: rawProfile.department || profile.department,
        lastLogin: rawProfile.lastLogin || profile.lastLogin,
      };
      setProfile(nextProfile);
      setFormData(nextProfile);
    }
  }, [profileData, user]);

  const initials = `${profile.firstName?.[0] || 'A'}${profile.lastName?.[0] || 'P'}`;

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulation de la mise à jour API
      setProfile(formData);
      setIsEditing(false);
      setSuccessMessage('Profil mis à jour avec succès.');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil :", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword) {
      setPasswordError('Veuillez entrer un nouveau mot de passe.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);
    try {
      setPasswordError('');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      setPasswordModalOpen(false);
      setSuccessMessage('Mot de passe mis à jour avec succès.');
      setTimeout(() => setSuccessMessage(''), 4000);
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
          <span>Chargement du profil administrateur...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-sm flex items-center gap-3">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span>Erreur lors du chargement du profil. Veuillez réessayer plus tard.</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50/60 p-8 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profil Administrateur</h1>
          <p className="text-sm text-slate-500">Gérez vos informations professionnelles et paramètres de sécurité</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
          >
            <Edit3 className="h-4 w-4" />
            <span>Modifier le profil</span>
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData(profile);
            }}
            className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
          >
            <span>Annuler</span>
          </button>
        )}
      </header>

      {successMessage && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm flex items-center gap-3 text-sm">
          <ShieldCheck className="h-5 w-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-start gap-4 lg:gap-6">
          <div className="h-24 w-24 rounded-full bg-slate-900 flex items-center justify-center text-2xl font-bold text-white">{initials}</div>
          <div>
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-slate-900">{profile.firstName} {profile.lastName}</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full ml-2 inline-flex items-center">Administrateur</span>
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
                <span>Actif depuis le {formatDate(profile.joinedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-700">
          <div className="flex items-center gap-3">
            <UserCheck className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Rôle</div>
              <div className="font-medium">{profile.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Département</div>
              <div className="font-medium">{profile.department}</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSessionSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">Informations professionnelles</h3>
          </div>

          <div className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Prénom</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              ) : (
                <span className="font-medium text-slate-900">{profile.firstName}</span>
              )}
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Nom</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              ) : (
                <span className="font-medium text-slate-900">{profile.lastName}</span>
              )}
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">E-mail professionnel</span>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              ) : (
                <span className="font-medium text-slate-900">{profile.email}</span>
              )}
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Téléphone</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              ) : (
                <span className="font-medium text-slate-900">{profile.phone}</span>
              )}
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Rôle système</span>
              <span className="font-medium text-slate-900">{profile.role}</span>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Département</span>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-blue-400"
                />
              ) : (
                <span className="font-medium text-slate-900">{profile.department}</span>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">Sécurité et Accréditations</h3>
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
                    setPasswordError('');
                    setPasswordModalOpen(true);
                  }}
                >
                  Changer
                </button>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">✓</span>
                <span className="text-slate-500">Droits Super-Admin</span>
              </div>
              <span className="font-medium text-emerald-700">Actifs</span>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <span className="text-slate-500">Dernière connexion</span>
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-900">{formatDateTime(profile.lastLogin)}</span>
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Sécurisée</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 text-sm">
        <Info className="h-4 w-4 shrink-0" />
        <div>En tant qu'administrateur, vous pouvez modifier vos propres informations professionnelles et gérer les dossiers des étudiants depuis la section de gestion dédiée.</div>
      </div>

      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <form onSubmit={savePassword} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800">Changer le mot de passe</h3>

            {passwordError && (
              <p className="mt-2 text-xs font-medium text-rose-600">{passwordError}</p>
            )}

            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Nouveau mot de passe</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Confirmer le mot de passe</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setPasswordModalOpen(false)} disabled={isSubmitting} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
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

function handleSessionSubmit(e) {
  e.preventDefault();
}