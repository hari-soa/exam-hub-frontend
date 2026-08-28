import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  Edit3,
  Info,
  Mail,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react';
import StudentEditModal from '../components/StudentEditModal';
import { useAuth } from '../context/AuthContext';
import { studentsData } from '../data/mockData';
import { formatDate, formatDateTime } from '../utils/format';

const defaultAdminProfile = {
  firstName: 'Dr. Amina',
  lastName: 'Kaci',
  email: 'admin@examhub.fr',
  phone: '+261 34 12 345 67',
  joinedAt: '2024-09-12T10:00:00.000Z',
  birthDate: '1987-03-15',
  gender: 'Féminin',
  address: 'Antananarivo, Madagascar',
  nationality: 'Malagasy',
  level: 'Administration',
  group: 'Équipe académique',
  major: 'Gestion pédagogique',
  recoveryEmail: 'admin.recovery@examhub.edu',
  lastLogin: '2026-06-18T09:48:00.000Z',
  notifications: true,
  role: 'Administrateur',
  id: 'ADM-1024',
};

export default function AdminProfile() {
  const { user, updateUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState(defaultAdminProfile);
  const [profileDraft, setProfileDraft] = useState(defaultAdminProfile);
  const [students, setStudents] = useState(studentsData || []);
  const [query, setQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(defaultAdminProfile.notifications);
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });
  const [recoveryEmail, setRecoveryEmail] = useState(defaultAdminProfile.recoveryEmail);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 40);
    const nextName = user?.name || `${defaultAdminProfile.firstName} ${defaultAdminProfile.lastName}`;
    const [firstName = defaultAdminProfile.firstName, ...rest] = nextName.split(' ');
    const nextProfile = {
      ...defaultAdminProfile,
      firstName,
      lastName: rest.join(' ') || defaultAdminProfile.lastName,
      email: user?.email || defaultAdminProfile.email,
      recoveryEmail: defaultAdminProfile.recoveryEmail,
    };
    setProfile(nextProfile);
    setProfileDraft(nextProfile);
    setRecoveryEmail(nextProfile.recoveryEmail);
    setNotifications(defaultAdminProfile.notifications);
    return () => clearTimeout(timer);
  }, [user]);

  const initials = `${profile.firstName?.[0] || 'A'}${profile.lastName?.[0] || 'K'}`;

  const filtered = students.filter((student) => {
    const searchText = `${student.name} ${student.email} ${student.id}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  const openEdit = (student) => setEditingStudent({ ...student });
  const closeEdit = () => setEditingStudent(null);
  const saveStudent = () => {
    setStudents((current) => current.map((student) => (student.id === editingStudent.id ? { ...editingStudent } : student)));
    setEditingStudent(null);
  };

  const saveProfile = () => {
    const nextProfile = { ...profileDraft };
    setProfile(nextProfile);
    setProfileDraft(nextProfile);

    if (user) {
      updateUser({
        name: `${nextProfile.firstName} ${nextProfile.lastName}`.trim(),
        email: nextProfile.email,
      });
    }

    setIsEditingProfile(false);
  };

  const savePassword = () => {
    if (passwordForm.newPassword && passwordForm.newPassword === passwordForm.confirmPassword) {
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      setPasswordModalOpen(false);
    }
  };

  const saveRecoveryEmail = () => {
    const nextProfile = { ...profile, recoveryEmail };
    setProfile(nextProfile);
    setRecoveryModalOpen(false);
  };

  return (
      <div className={`min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Mon profil</h1>
          <p className="text-xs sm:text-sm text-slate-500">Gérez vos informations personnelles et administratives</p>
        </header>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6 w-full lg:w-auto">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{profile.firstName} {profile.lastName}</h2>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center">
                Administrateur
              </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5 mt-2">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>Inscrit le {formatDate(profile.joinedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex lg:flex-col gap-3 text-xs sm:text-sm text-slate-700 w-full lg:w-auto border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Fonction</div>
                <div className="font-medium text-slate-800">{profile.level}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Groupe</div>
                <div className="font-medium text-slate-800">{profile.group}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                <User className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Rôle</div>
                <div className="font-medium text-slate-800">{profile.major}</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto flex justify-end pt-2 lg:pt-0">
            <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="w-full sm:w-auto border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
            >
              <Edit3 className="h-4 w-4 text-slate-500" />
              Modifier le profil
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Informations personnelles</h3>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Nom complet</span>
                <span className="text-sm font-medium text-slate-800 text-right">{profile.firstName} {profile.lastName}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Date de naissance</span>
                <span className="text-sm font-medium text-slate-800 text-right">{formatDate(profile.birthDate)}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Genre</span>
                <span className="text-sm font-medium text-slate-800 text-right">{profile.gender}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">E-mail</span>
                <span className="text-sm font-medium text-slate-800 truncate text-right">{profile.email}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Téléphone</span>
                <span className="text-sm font-medium text-slate-800 text-right">{profile.phone}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Adresse</span>
                <span className="text-sm font-medium text-slate-800 text-right">{profile.address}</span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Nationalité</span>
                <span className="text-sm font-medium text-slate-800 text-right">{profile.nationality}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">Sécurité du compte</h3>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Mot de passe</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-800">••••••••••</span>
                  <button
                      type="button"
                      className="border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-50 transition active:scale-95"
                      onClick={() => setPasswordModalOpen(true)}
                  >
                    Changer
                  </button>
                </div>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Email de récupération</span>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-sm font-medium text-slate-800 truncate">{profile.recoveryEmail}</span>
                  <button
                      type="button"
                      className="border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-slate-50 transition active:scale-95 flex-shrink-0"
                      onClick={() => setRecoveryModalOpen(true)}
                  >
                    Changer
                  </button>
                </div>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 text-emerald-700 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Authentification</span>
                </div>
                <span className="text-sm font-semibold text-emerald-700">Activée</span>
              </div>
              <div className="py-3 flex items-center justify-between gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">Dernière connexion</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-slate-800">{formatDateTime(profile.lastLogin)}</span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold hidden sm:inline-block">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex justify-between items-center mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Notifications par email</h4>
              <p className="text-xs text-slate-500">Recevez les alertes liées aux étudiants, examens et résultats.</p>
            </div>
          </div>

          <label className="relative inline-flex cursor-pointer items-center flex-shrink-0 ml-4">
            <input type="checkbox" checked={notifications} onChange={() => setNotifications((value) => !value)} className="peer sr-only" />
            <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600" style={{ backgroundColor: notifications ? '#2563EB' : undefined }} />
            <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifications ? 'translate-x-5' : ''}`} />
          </label>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-800">Gestion des étudiants</h3>
                <p className="text-xs sm:text-sm text-slate-500">Rechercher et modifier les comptes étudiants</p>
              </div>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  placeholder="Rechercher un étudiant..."
              />
            </div>
          </div>

          <div className="grid gap-2.5 max-h-72 overflow-y-auto pr-1">
            {filtered.slice(0, 10).map((student) => (
                <div key={student.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50/80 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 flex-shrink-0">
                      {student.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">{student.name}</div>
                      <div className="text-xs text-slate-500 truncate">{student.email} • {student.id}</div>
                    </div>
                  </div>
                  <button
                      type="button"
                      onClick={() => openEdit(student)}
                      className="border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium hover:bg-white transition-all active:scale-95 flex-shrink-0"
                  >
                    Modifier
                  </button>
                </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 text-sm">
          <Info className="h-4 w-4 flex-shrink-0" />
          <div className="text-xs sm:text-sm">Assurez-vous que vos informations personnelles sont à jour pour garantir un accès sécurisé.</div>
        </div>

        {isEditingProfile && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-slate-800">Modifier le profil</h3>
                  <p className="text-xs text-slate-500">Mettez à jour vos informations administrateur.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Prénom</label>
                      <input value={profileDraft.firstName} onChange={(event) => setProfileDraft((current) => ({ ...current, firstName: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Nom</label>
                      <input value={profileDraft.lastName} onChange={(event) => setProfileDraft((current) => ({ ...current, lastName: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Email</label>
                    <input value={profileDraft.email} onChange={(event) => setProfileDraft((current) => ({ ...current, email: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Téléphone</label>
                    <input value={profileDraft.phone} onChange={(event) => setProfileDraft((current) => ({ ...current, phone: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition">Annuler</button>
                  <button type="button" onClick={saveProfile} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition shadow-sm">Enregistrer</button>
                </div>
              </div>
            </div>
        )}

        {passwordModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-slate-800">Changer le mot de passe</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Nouveau mot de passe</label>
                    <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Confirmer le mot de passe</label>
                    <input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition">Annuler</button>
                  <button type="button" onClick={savePassword} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition shadow-sm">Enregistrer</button>
                </div>
              </div>
            </div>
        )}

        {recoveryModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h3 className="text-lg font-bold text-slate-800">Modifier l'email de récupération</h3>
                <div className="mt-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Email</label>
                  <input value={recoveryEmail} onChange={(event) => setRecoveryEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white" />
                </div>
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => setRecoveryModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 active:scale-95 transition">Annuler</button>
                  <button type="button" onClick={saveRecoveryEmail} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-95 transition shadow-sm">Enregistrer</button>
                </div>
              </div>
            </div>
        )}

        {editingStudent && (
            <StudentEditModal student={editingStudent} onClose={closeEdit} onSave={saveStudent} setStudent={setEditingStudent} />
        )}
      </div>
  );
}