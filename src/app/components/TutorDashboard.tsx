import { ArrowLeft, User, Phone, Calendar, Clock, MapPin, MessageCircle, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import type { View } from '../App';

interface TutorDashboardProps {
  onNavigate: (view: View) => void;
  currentUser: any;
}

const patientsData = [
  {
    id: 1,
    name: 'José da Silva',
    relationship: 'Pai',
    age: 75,
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    appointments: [
      {
        id: 1,
        type: 'caregiver',
        professional: {
          name: 'Maria Silva',
          phone: '(11) 99999-1111',
          email: 'maria.cuidadora@email.com',
          photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
        },
        date: '15/12/2024',
        time: '14:00',
        status: 'confirmado',
        address: 'Hospital São Luiz - Av. Paulista, 1234',
        notes: 'Consulta cardiologista - Dr. Roberto'
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Santos',
    relationship: 'Mãe',
    age: 82,
    address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP',
    appointments: [
      {
        id: 2,
        type: 'driver',
        professional: {
          name: 'Carlos Oliveira',
          phone: '(11) 99999-2222',
          email: 'carlos.motorista@email.com',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        },
        date: '18/12/2024',
        time: '09:30',
        status: 'confirmado',
        address: 'Clínica Medical - Rua Augusta, 567',
        notes: 'Exame de sangue'
      }
    ]
  }
];

export function TutorDashboard({ onNavigate, currentUser }: TutorDashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  const tutor = currentUser || {
    name: 'Ana Silva',
    phone: '(11) 91234-5678',
    patients: patientsData
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Sair</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white mb-2">Área do Tutor</h1>
            <p className="text-purple-100">Olá, {tutor.name}</p>
          </div>
          <button 
            onClick={() => onNavigate('messages')}
            className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-400 relative"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {/* Patient Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-6">
          <p className="text-gray-600 text-sm mb-2">Paciente selecionado:</p>
          <div className="relative">
            <button
              onClick={() => setShowPatientDropdown(!showPatientDropdown)}
              className="w-full flex items-center justify-between p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900">{selectedPatient.name}</p>
                  <p className="text-purple-700 text-sm">{selectedPatient.relationship}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${showPatientDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showPatientDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden z-10">
                {patientsData.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowPatientDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                      selectedPatient.id === patient.id ? 'bg-purple-50' : ''
                    }`}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900">{patient.name}</p>
                      <p className="text-purple-700 text-sm">{patient.relationship}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-gray-900 mb-4">Informações do Paciente</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 text-sm">Idade</p>
              <p className="text-gray-900">{selectedPatient.age} anos</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Endereço</p>
              <p className="text-gray-900">{selectedPatient.address}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Relacionamento</p>
              <p className="text-gray-900">{selectedPatient.relationship}</p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Próximos Agendamentos</h3>
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          
          <div className="space-y-4">
            {selectedPatient.appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-colors"
              >
                {/* Professional Info */}
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={appointment.professional.photo}
                    alt={appointment.professional.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 mb-1">{appointment.professional.name}</p>
                    <p className="text-gray-500 text-sm mb-2">
                      {appointment.type === 'caregiver' ? 'Cuidador' : 'Motorista'}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        appointment.status === 'confirmado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {appointment.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date} às {appointment.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>{appointment.address}</span>
                  </div>
                  {appointment.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-2">
                      <p className="text-gray-700 text-sm">{appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Contact Professional */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm mb-3">Contato do profissional:</p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${appointment.professional.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ligar</span>
                    </a>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Mensagem</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedPatient.appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum agendamento próximo para {selectedPatient.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}