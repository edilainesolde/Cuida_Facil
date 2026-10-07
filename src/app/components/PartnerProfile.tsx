import { ArrowLeft, Star, Calendar, Clock, MapPin, MessageCircle, TrendingUp, DollarSign, User, Bell } from 'lucide-react';
import type { View } from '../App';

interface PartnerProfileProps {
  onNavigate: (view: View) => void;
  currentUser: any;
}

const upcomingJobs = [
  {
    id: 1,
    patient: 'José da Silva',
    tutor: {
      name: 'Ana Silva',
      relationship: 'Filha',
      phone: '(11) 91234-5678'
    },
    date: '15/12/2024',
    time: '14:00',
    address: 'Hospital São Luiz - Av. Paulista, 1234',
    type: 'Consulta médica',
    payment: 'R$ 80,00',
    status: 'confirmado'
  },
  {
    id: 2,
    patient: 'Maria Santos',
    tutor: {
      name: 'Pedro Santos',
      relationship: 'Filho',
      phone: '(11) 92345-6789'
    },
    date: '16/12/2024',
    time: '10:00',
    address: 'Clínica Reabilitar - Rua Augusta, 456',
    type: 'Fisioterapia',
    payment: 'R$ 80,00',
    status: 'confirmado'
  }
];

const completedJobs = [
  {
    id: 3,
    patient: 'Carlos Mendes',
    date: '12/12/2024',
    payment: 'R$ 80,00',
    rating: 5
  },
  {
    id: 4,
    patient: 'Lucia Oliveira',
    date: '10/12/2024',
    payment: 'R$ 80,00',
    rating: 5
  }
];

const pendingRequestsCount = 2;

export function PartnerProfile({ onNavigate, currentUser }: PartnerProfileProps) {
  const partner = currentUser || {
    name: 'Maria Silva',
    phone: '(11) 99999-1111',
    email: 'maria.cuidadora@email.com',
    type: 'caregiver',
    experience: '8 anos',
    rating: 4.9,
    reviews: 127,
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    availability: {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '08:00',
      endTime: '18:00'
    }
  };

  const thisMonthEarnings = 'R$ 2.400,00';
  const completedThisMonth = 30;

  const dayLabels: { [key: string]: string } = {
    monday: 'Seg',
    tuesday: 'Ter',
    wednesday: 'Qua',
    thursday: 'Qui',
    friday: 'Sex',
    saturday: 'Sáb',
    sunday: 'Dom'
  };

  const bgColor = partner.type === 'caregiver' ? 'bg-blue-600' : 'bg-green-600';
  const accentColor = partner.type === 'caregiver' ? 'blue' : 'green';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${bgColor} text-white p-6 pb-8`}>
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Sair</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Área do Parceiro</h1>
            <p className={partner.type === 'caregiver' ? 'text-blue-100' : 'text-green-100'}>
              {partner.type === 'caregiver' ? 'Cuidador' : 'Motorista'}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onNavigate('partner-requests')}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center ${
                partner.type === 'caregiver' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500 hover:bg-green-400'
              }`}
            >
              <Bell className="w-6 h-6 text-white" />
              {pendingRequestsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => onNavigate('messages')}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                partner.type === 'caregiver' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-500 hover:bg-green-400'
              }`}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={partner.photo}
              alt={partner.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1">{partner.name}</h2>
              <p className="text-gray-600 mb-2">{partner.experience} de experiência</p>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-gray-900">{partner.rating}</span>
                <span className="text-gray-500">({partner.reviews} avaliações)</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <p className="text-gray-900">Disponibilidade</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {partner.availability.days.map((day: string) => (
                <span
                  key={day}
                  className={`px-3 py-1 bg-${accentColor}-100 text-${accentColor}-700 rounded-full text-sm`}
                >
                  {dayLabels[day]}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              {partner.availability.startTime} - {partner.availability.endTime}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-${accentColor}-50 rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className={`w-5 h-5 text-${accentColor}-600`} />
                <p className={`text-${accentColor}-900 text-sm`}>Este mês</p>
              </div>
              <p className={`text-${accentColor}-600 text-xl`}>{thisMonthEarnings}</p>
            </div>
            <div className={`bg-${accentColor}-50 rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`w-5 h-5 text-${accentColor}-600`} />
                <p className={`text-${accentColor}-900 text-sm`}>Atendimentos</p>
              </div>
              <p className={`text-${accentColor}-600 text-xl`}>{completedThisMonth}</p>
            </div>
          </div>
        </div>

        {/* Pending Requests Alert */}
        {pendingRequestsCount > 0 && (
          <button
            onClick={() => onNavigate('partner-requests')}
            className={`w-full bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 mb-6 hover:bg-yellow-100 transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-yellow-600" />
                <div className="text-left">
                  <p className="text-yellow-900">
                    {pendingRequestsCount} {pendingRequestsCount === 1 ? 'solicitação pendente' : 'solicitações pendentes'}
                  </p>
                  <p className="text-yellow-700 text-sm">Toque para visualizar</p>
                </div>
              </div>
              <span className="w-8 h-8 bg-yellow-200 text-yellow-900 rounded-full flex items-center justify-center">
                {pendingRequestsCount}
              </span>
            </div>
          </button>
        )}

        {/* Upcoming Jobs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Próximos Atendimentos</h3>
          
          <div className="space-y-4">
            {upcomingJobs.map((job) => (
              <div
                key={job.id}
                className={`border-2 border-gray-100 rounded-xl p-4 hover:border-${accentColor}-200 transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{job.patient}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{job.type}</p>
                  </div>
                  <span className={`px-3 py-1 bg-${accentColor}-100 text-${accentColor}-700 rounded-full text-sm`}>
                    {job.payment}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{job.date} às {job.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{job.address}</span>
                  </div>
                </div>

                {/* Tutor Contact */}
                <div className="bg-purple-50 rounded-lg p-3 mb-3">
                  <p className="text-purple-900 text-sm mb-1">Contato do Tutor:</p>
                  <p className="text-purple-700">{job.tutor.name} ({job.tutor.relationship})</p>
                  <p className="text-purple-600 text-sm">{job.tutor.phone}</p>
                </div>

                <button
                  onClick={() => onNavigate('messages')}
                  className={`w-full flex items-center justify-center gap-2 py-3 bg-${accentColor}-600 text-white rounded-lg hover:bg-${accentColor}-700 transition-colors`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Mensagem para tutor</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-gray-900 mb-4">Atendimentos Recentes</h3>
          
          <div className="space-y-3">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="text-gray-900 mb-1">{job.patient}</p>
                  <p className="text-gray-500 text-sm">{job.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-${accentColor}-600 mb-1`}>{job.payment}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-gray-700 text-sm">{job.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}