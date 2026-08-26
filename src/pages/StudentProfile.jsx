import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  Edit3,
  GraduationCap,
  Info,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatDate, formatDateTime } from '../utils/format';

const defaultStudentProfile = {
  firstName: 'Nassim',
  lastName: 'Bensaid',
  email: 'nassim.bensaid@campus.fr',
  phone: '+261 34 12 345 67',
  joinedAt: '2024-09-12T10:00:00.000Z',
  birthDate: '2005-03-15',
  gender: 'Masculin',
  address: 'Lot IVB 12, Analamaanahitsy, Antananarivo 101, Madagascar',
  nationality: 'Malagasy',
  level: 'L1',
  group: '11 - Groupe A',
  major: 'Informatique',
  recoveryEmail: 'nassim.recovery@examhub.edu',
  lastLogin: '2026-05-18T14:32:00.000Z',
  notifications: true,
};

export default function StudentProfile() {
  const { user, updateUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(defaultStudentProfile.notifications);
  const [profile, setProfile] = useState(defaultStudentProfile);
  const [profileDraft, setProfileDraft] = useState(defaultStudentProfile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState(defaultStudentProfile.recoveryEmail);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    const nextName = user?.name || defaultStudentProfile.firstName + ' ' + defaultStudentProfile.lastName;
    const [firstName = defaultStudentProfile.firstName, ...rest] = nextName.split(' ');
    const nextProfile = {
      ...defaultStudentProfile,
      firstName,
      lastName: rest.join(' ') || defaultStudentProfile.lastName,
      email: user?.email || defaultStudentProfile.email,
      recoveryEmail: defaultStudentProfile.recoveryEmail,
    };

    setProfile(nextProfile);
    setProfileDraft(nextProfile);
    setRecoveryEmail(nextProfile.recoveryEmail);
    setNotifications(defaultStudentProfile.notifications);
    return () => clearTimeout(timer);
  }, [user]);

  const initials = `${profile.firstName?.[0] || 'N'}${profile.lastName?.[0] || 'B'}`;

  const handleOpenEditProfile = () => {
    setProfileDraft(profile);
    setIsEditingProfile(true);
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const nextProfile = { ...profileDraft };
    setProfile(nextProfile);
    setProfileDraft(nextProfile);

    if (user && updateUser) {
      updateUser({
        name: `${nextProfile.firstName} ${nextProfile.lastName}`.trim(),
        email: nextProfile.email,
      });
    }

    setIsEditingProfile(false);
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.newPassword) {
      setPasswordError('Veuillez entrer un nouveau mot de passe.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }

    setPasswordError('');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setPasswordModalOpen(false);
  };

  const saveRecoveryEmail = (e) => {
    e.preventDefault();
    const nextProfile = { ...profile, recoveryEmail };
    setProfile(nextProfile);
    setRecoveryModalOpen(false);
  };

  return (
      <div className={`min-h-screen bg-slate-50/60 p-8 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
          <p className="text-sm text-slate-500 mb-6">Gérez vos informations personnelles</p>
        </header>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-start gap-4 lg:gap-6">
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">{initials}</div>
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-slate-900">{profile.firstName} {profile.lastName}</h2>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full ml-2 inline-flex items-center">Étudiant</span>
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

          <div className="w-full lg:w-auto flex justify-end">
            <button
                type="button"
                onClick={handleOpenEditProfile}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors active:scale-95"
            >
              <Edit3 className="h-4 w-4" />
              Modifier le profil
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Informations personnelles</h3>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Nom complet</span>
                <span className="font-medium text-slate-900">{profile.firstName} {profile.lastName}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Date de naissance</span>
                <span className="font-medium text-slate-900">{formatDate(profile.birthDate)}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Genre</span>
                <span className="font-medium text-slate-900">{profile.gender}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">E-mail</span>
                <span className="font-medium text-slate-900">{profile.email}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Téléphone</span>
                <span className="font-medium text-slate-900">{profile.phone}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Adresse</span>
                <span className="font-medium text-slate-900 text-right">{profile.address}</span>
              </div>
              <div className="py-3 flex justify-between gap-4">
                <span className="text-slate-500">Nationalité</span>
                <span className="font-medium text-slate-900">{profile.nationality}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Sécurité du compte</h3>
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
                <span className="text-slate-500">Email de récupération</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-900">{profile.recoveryEmail}</span>
                  <button type="button" className="border border-slate-200 text-slate-700 px-3 py-1 rounded-md text-xs hover:bg-slate-50" onClick={() => setRecoveryModalOpen(true)}>Changer</button>
                </div>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">✓</span>
                  <span className="text-slate-500">Authentification</span>
                </div>
                <span className="font-medium text-emerald-700">Activée</span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-slate-500">Dernière connexion</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-900">{formatDateTime(profile.lastLogin)}</span>
                  <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex justify-between items-center mb-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <div className="text-sm font-semibold text-slate-800">Notifications par email</div>
              <div className="text-xs text-slate-500">Recevez vos notifications concernant vos examens, résultats et mises à jour.</div>
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
            <span className={`h-6 w-11 rounded-full transition ${notifications ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifications ? 'translate-x-5' : ''}`} />
          </label>
        </div>

        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 text-sm">
          <Info className="h-4 w-4" />
          <div>Assurez-vous que vos informations personnelles sont à jour.</div>
        </div>

        {isEditingProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
              <form onSubmit={saveProfile} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-5">
                  <h3 className="text-xl font-semibold text-slate-800">Modifier votre profil</h3>
                  <p className="text-sm text-slate-500">Mettez à jour vos informations personnelles.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Prénom</label>
                      <input
                          type="text"
                          required
                          value={profileDraft.firstName}
                          onChange={(event) => setProfileDraft((current) => ({ ...current, firstName: event.target.value }))}
                          className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Nom</label>
                      <input
                          type="text"
                          required
                          value={profileDraft.lastName}
                          onChange={(event) => setProfileDraft((current) => ({ ...current, lastName: event.target.value }))}
                          className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
                    <input
                        type="email"
                        required
                        value={profileDraft.email}
                        onChange={(event) => setProfileDraft((current) => ({ ...current, email: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Téléphone</label>
                    <input
                        type="tel"
                        value={profileDraft.phone}
                        onChange={(event) => setProfileDraft((current) => ({ ...current, phone: event.target.value }))}
                        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
                  <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
                </div>
              </form>
            </div>
        )}

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
                  <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
                  <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
                </div>
              </form>
            </div>
        )}

        {recoveryModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
              <form onSubmit={saveRecoveryEmail} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h3 className="text-xl font-semibold text-slate-800">Modifier l’email de récupération</h3>
                <div className="mt-4">
                  <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
                  <input
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(event) => setRecoveryEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400"
                  />
                </div>
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setRecoveryModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
                  <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
                </div>
              </form>
            </div>
        )}
      </div>
  );
}