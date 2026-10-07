import { ArrowLeft, User, Calendar, Clock, MapPin, Check, X, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { View } from '../App';

interface PartnerRequestsProps {
  onNavigate: (view: View) => void;
  currentUser: any;
}

export function PartnerRequests({ onNavigate, currentUser }: PartnerRequestsProps) {
  const [requests, setRequests] = useState([
    {
      id: 1,
      patient: {
        name: 'José da Silva',
        age: 75,
        phone: '(11) 98765-4321',
        address: 'Rua das Flores, 123 - Centro, São Paulo - SP'
      },
      tutor: {
        name: 'Ana Silva',
        relationship: 'Filha',
        phone: '(11) 91234-5678'
      },
      appointment: {
        date: '15/12/2024',
        time: '14:00',
        address: 'Hospital São Luiz - Av. Paulista, 1234',
        type: 'Consulta médica',
        notes: 'Consulta cardiologista - Dr. Roberto'
      },
      payment: 'R$ 80,00',
      requestedAt: '08/12/2024 10:30',
      status: 'pending'
    },
    {
      id: 2,
      patient: {
        name: 'Maria Santos',
        age: 82,
        phone: '(11) 99999-9999',
        address: 'Av. Paulista, 456 - Bela Vista, São Paulo - SP'
      },
      tutor: {
        name: 'Pedro Santos',
        relationship: 'Filho',
        phone: '(11) 92345-6789'
      },
      appointment: {
        date: '16/12/2024',
        time: '10:00',
        address: 'Clínica Reabilitar - Rua Augusta, 456',
        type: 'Fisioterapia',
        notes: ''
      },
      payment: 'R$ 80,00',
      requestedAt: '08/12/2024 09:15',
      status: 'pending'
    }
  ]);

  const handleAccept = (requestId: number) => {
    setRequests(requests.map(r => 
      r.id === requestId ? { ...r, status: 'accepted' } : r
    ));
    // Aqui seria feita a chamada para aceitar no backend
    setTimeout(() => {
      alert('Solicitação aceita! O cliente será notificado.');
      setRequests(requests.filter(r => r.id !== requestId));
    }, 500);
  };

  const handleReject = (requestId: number) => {
    if (confirm('Tem certeza que deseja recusar esta solicitação?')) {
      setRequests(requests.filter(r => r.id !== requestId));
      // Aqui seria feita a chamada para recusar no backend
    }
  };

  const partner = currentUser || {
    type: 'caregiver'
  };

  const bgColor = partner.type === 'caregiver' ? 'bg-blue-600' : 'bg-green-600';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${bgColor} text-white p-6 pb-8`}>
        <button
          onClick={() => onNavigate('partner')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <h1 className="text-white mb-2">Solicitações Pendentes</h1>
        <p className={partner.type === 'caregiver' ? 'text-blue-100' : 'text-green-100'}>
          Aceite ou recuse solicitações de serviço
        </p>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow-lg p-5"
              >
                {/* Patient Info */}
                <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{request.patient.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{request.patient.age} anos</p>
                    <p className="text-gray-500 text-sm">
                      Solicitado em {request.requestedAt}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    partner.type === 'caregiver' 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {request.payment}
                  </span>
                </div>

                {/* Appointment Details */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <p className="text-gray-500 text-sm mb-3">Detalhes do atendimento:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{request.appointment.date} às {request.appointment.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span>{request.appointment.address}</span>
                    </div>
                  </div>
                  {request.appointment.notes && (
                    <div className="bg-gray-50 rounded-lg p-3 mt-3">
                      <p className="text-gray-600 text-sm mb-1">Tipo:</p>
                      <p className="text-gray-900">{request.appointment.type}</p>
                      <p className="text-gray-700 text-sm mt-2">{request.appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* Tutor Contact */}
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <p className="text-purple-900 mb-2">Contato do Tutor:</p>
                  <p className="text-purple-700">{request.tutor.name}</p>
                  <p className="text-purple-600 text-sm mb-3">
                    {request.tutor.relationship} de {request.patient.name}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${request.tutor.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ligar</span>
                    </a>
                    <button
                      onClick={() => onNavigate('messages')}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Mensagem</span>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>Recusar</span>
                  </button>
                  <button
                    onClick={() => handleAccept(request.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-white rounded-xl transition-colors ${
                      partner.type === 'caregiver'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    <Check className="w-5 h-5" />
                    <span>Aceitar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Nenhuma solicitação pendente</h3>
            <p className="text-gray-600">
              Quando alguém solicitar seus serviços, aparecerá aqui para você aceitar ou recusar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
