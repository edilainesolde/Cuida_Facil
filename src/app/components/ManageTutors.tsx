import { ArrowLeft, User, Phone, Trash2, UserPlus, Mail } from 'lucide-react';
import { useState } from 'react';
import type { View } from '../App';

interface ManageTutorsProps {
  onNavigate: (view: View) => void;
  currentUser: any;
}

const relationshipOptions = [
  'Pai',
  'Mãe',
  'Avó',
  'Avô',
  'Tio',
  'Tia',
  'Primo',
  'Prima',
  'Sobrinho',
  'Sobrinha',
  'Filho',
  'Filha',
  'Neto',
  'Neta',
  'Amigo',
  'Amiga',
  'Outro'
];

export function ManageTutors({ onNavigate, currentUser }: ManageTutorsProps) {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: ''
  });

  const [tutors, setTutors] = useState([
    {
      id: 1,
      name: 'Ana Silva',
      phone: '(11) 91234-5678',
      email: 'ana.silva@email.com',
      relationship: 'Filha',
      status: 'approved'
    }
  ]);

  const handleRemoveTutor = (tutorId: number) => {
    if (confirm('Tem certeza que deseja remover este tutor?')) {
      setTutors(tutors.filter(t => t.id !== tutorId));
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria feita a chamada para enviar convite
    alert(`Convite enviado para ${inviteData.name}!`);
    setShowInviteForm(false);
    setInviteData({ name: '', phone: '', email: '', relationship: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <h1 className="text-white mb-2">Gerenciar Tutores</h1>
        <p className="text-purple-100">Adicione ou remova tutores responsáveis</p>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* Add Tutor Button */}
        {!showInviteForm && (
          <button
            onClick={() => setShowInviteForm(true)}
            className="w-full bg-purple-600 text-white rounded-2xl p-5 shadow-lg mb-6 hover:bg-purple-700 transition-colors flex items-center justify-center gap-3"
          >
            <UserPlus className="w-6 h-6" />
            <span className="text-lg">Convidar Tutor</span>
          </button>
        )}

        {/* Invite Form */}
        {showInviteForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Convidar Novo Tutor</h3>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="text-gray-700 mb-2 block">Nome completo</label>
                <input
                  type="text"
                  required
                  placeholder="Nome do tutor"
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-2 block">Telefone</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 98765-4321"
                  value={inviteData.phone}
                  onChange={(e) => setInviteData({ ...inviteData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-2 block">Email</label>
                <input
                  type="email"
                  required
                  placeholder="email@exemplo.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-2 block">Relacionamento</label>
                <select
                  required
                  value={inviteData.relationship}
                  onChange={(e) => setInviteData({ ...inviteData, relationship: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white"
                >
                  <option value="">Selecione...</option>
                  {relationshipOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Current Tutors */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Tutores Ativos</h3>
          
          {tutors.length > 0 ? (
            <div className="space-y-4">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1">{tutor.name}</h4>
                      <p className="text-purple-700 text-sm mb-2">{tutor.relationship}</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Phone className="w-3 h-3" />
                          <span>{tutor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Mail className="w-3 h-3" />
                          <span>{tutor.email}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveTutor(tutor.id)}
                      className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhum tutor cadastrado ainda
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
