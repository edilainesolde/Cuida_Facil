import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, Clock, Users, Edit, Bell, UserPlus } from 'lucide-react';
import type { View } from '../App';

interface ProfileProps {
  onNavigate: (view: View) => void;
  service: any;
  currentUser: any;
}

const mockAppointments = [
  {
    id: 1,
    type: 'caregiver',
    professional: 'Maria Silva',
    professionalPhone: '(11) 99999-1111',
    date: '15/12/2024',
    time: '14:00',
    status: 'confirmado',
    address: 'Hospital São Luiz - Av. Paulista, 1234'
  },
  {
    id: 2,
    type: 'driver',
    professional: 'Carlos Oliveira',
    professionalPhone: '(11) 99999-2222',
    date: '18/12/2024',
    time: '09:30',
    status: 'pendente',
    address: 'Clínica Medical - Rua Augusta, 567'
  }
];

export function Profile({ onNavigate, currentUser }: ProfileProps) {
  const user = currentUser || {
    name: 'José da Silva',
    phone: '(11) 98765-4321',
    email: 'jose.silva@email.com',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    tutors: [
      {
        id: 1,
        name: 'Ana Silva',
        phone: '(11) 91234-5678',
        relationship: 'Filha',
        status: 'approved'
      }
    ],
    pendingTutorRequests: [
      {
        id: 2,
        name: 'Carlos Silva',
        phone: '(11) 98888-7777',
        relationship: 'Filho',
        status: 'pending'
      }
    ]
  };

  const hasPendingRequests = user.pendingTutorRequests && user.pendingTutorRequests.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Meu Perfil</h1>
            <p className="text-blue-100">Informações pessoais e agendamentos</p>
          </div>
          {hasPendingRequests && (
            <button
              onClick={() => onNavigate('tutor-requests')}
              className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400"
            >
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                {user.pendingTutorRequests.length}
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600">Usuário desde Dez/2024</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-gray-400" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <span>{user.address}</span>
            </div>
          </div>
        </div>

        {/* Tutors Section */}
        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-purple-900 mb-0.5">Tutores Responsáveis</h3>
                <p className="text-purple-700 text-sm">Podem acompanhar seus agendamentos</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('manage-tutors')}
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200"
            >
              <UserPlus className="w-5 h-5 text-purple-600" />
            </button>
          </div>
          
          {user.tutors && user.tutors.length > 0 ? (
            <div className="space-y-3">
              {user.tutors.map((tutor: any) => (
                <div key={tutor.id} className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 mb-1">{tutor.name}</p>
                      <p className="text-purple-700 text-sm mb-1">{tutor.relationship}</p>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{tutor.phone}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Ativo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-purple-700 text-center py-4">Nenhum tutor cadastrado ainda</p>
          )}
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Meus Agendamentos</h3>
          
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-2 border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gray-900 mb-1">{appointment.professional}</p>
                    <p className="text-gray-500 text-sm">
                      {appointment.type === 'caregiver' ? 'Cuidador' : 'Motorista'}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{appointment.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mockAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Você ainda não tem agendamentos
            </div>
          )}
        </div>
      </div>
    </div>
  );
}