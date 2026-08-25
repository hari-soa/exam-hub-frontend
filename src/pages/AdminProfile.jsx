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
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full ml-2 inline-flex items-center">Administrateur</span>
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
            <BookOpen className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Fonction</div>
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
            <User className="h-5 w-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500">Rôle</div>
              <div className="font-medium">{profile.major}</div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-auto flex justify-end">
          <button
            type="button"
            onClick={() => setIsEditingProfile(true)}
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
              <div className="text-sm text-slate-500">Nom complet</div>
              <div className="text-sm font-medium text-slate-900">{profile.firstName} {profile.lastName}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">Date de naissance</div>
              <div className="text-sm font-medium text-slate-900">{formatDate(profile.birthDate)}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">Genre</div>
              <div className="text-sm font-medium text-slate-900">{profile.gender}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">E-mail</div>
              <div className="text-sm font-medium text-slate-900">{profile.email}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">Téléphone</div>
              <div className="text-sm font-medium text-slate-900">{profile.phone}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">Adresse</div>
              <div className="text-sm font-medium text-slate-900">{profile.address}</div>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <div className="text-sm text-slate-500">Nationalité</div>
              <div className="text-sm font-medium text-slate-900">{profile.nationality}</div>
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
              <div className="text-sm text-slate-500">Mot de passe</div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-slate-900">••••••••••</div>
                <button type="button" className="border border-slate-200 text-slate-700 px-3 py-1 rounded-md text-xs hover:bg-slate-50" onClick={() => setPasswordModalOpen(true)}>Changer</button>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="text-sm text-slate-500">Email de récupération</div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-slate-900">{profile.recoveryEmail}</div>
                <button type="button" className="border border-slate-200 text-slate-700 px-3 py-1 rounded-md text-xs hover:bg-slate-50" onClick={() => setRecoveryModalOpen(true)}>Changer</button>
              </div>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">✓</div>
                <div className="text-sm text-slate-500">Authentification</div>
              </div>
              <div className="text-sm font-medium text-emerald-700">Activée</div>
            </div>
            <div className="py-3 flex items-center justify-between gap-4">
              <div className="text-sm text-slate-500">Dernière connexion</div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-slate-900">{formatDateTime(profile.lastLogin)}</div>
                <div className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-medium">Active</div>
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
            <div className="text-xs text-slate-500">Recevez les alertes liées aux étudiants, examens et résultats.</div>
          </div>
        </div>

        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" checked={notifications} onChange={() => setNotifications((value) => !value)} className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600" style={{ backgroundColor: notifications ? '#2563EB' : undefined }} />
          <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${notifications ? 'translate-x-5' : ''}`} />
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Gestion des étudiants</h3>
              <p className="text-sm text-slate-500">Rechercher et modifier les comptes étudiants</p>
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-blue-400"
              placeholder="Rechercher un étudiant"
            />
          </div>
        </div>

        <div className="grid gap-3 max-h-72 overflow-y-auto pr-1">
          {filtered.slice(0, 10).map((student) => (
            <div key={student.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700">{student.avatar}</div>
                <div>
                  <div className="text-sm font-medium text-slate-800">{student.name}</div>
                  <div className="text-xs text-slate-500">{student.email} • {student.id}</div>
                </div>
              </div>
              <button type="button" onClick={() => openEdit(student)} className="border border-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-slate-50 transition-colors">Modifier</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-blue-50/70 border border-blue-100 rounded-xl p-4 flex items-center gap-3 text-blue-800 text-sm">
        <Info className="h-4 w-4" />
        <div>Assurez-vous que vos informations personnelles sont à jour.</div>
      </div>

      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h3 className="text-xl font-semibold text-slate-800">Modifier le profil</h3>
              <p className="text-sm text-slate-500">Mettez à jour vos informations administrateur.</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Prénom</label>
                  <input value={profileDraft.firstName} onChange={(event) => setProfileDraft((current) => ({ ...current, firstName: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Nom</label>
                  <input value={profileDraft.lastName} onChange={(event) => setProfileDraft((current) => ({ ...current, lastName: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
                <input value={profileDraft.email} onChange={(event) => setProfileDraft((current) => ({ ...current, email: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Téléphone</label>
                <input value={profileDraft.phone} onChange={(event) => setProfileDraft((current) => ({ ...current, phone: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setIsEditingProfile(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
              <button type="button" onClick={saveProfile} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800">Changer le mot de passe</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Nouveau mot de passe</label>
                <input type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Confirmer le mot de passe</label>
                <input type="password" value={passwordForm.confirmPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setPasswordModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
              <button type="button" onClick={savePassword} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {recoveryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-800">Modifier l’email de récupération</h3>
            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Email</label>
              <input value={recoveryEmail} onChange={(event) => setRecoveryEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-400" />
            </div>
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setRecoveryModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">Annuler</button>
              <button type="button" onClick={saveRecoveryEmail} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Enregistrer</button>
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
