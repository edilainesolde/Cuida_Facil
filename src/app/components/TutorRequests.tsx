import { ArrowLeft, User, Phone, Check, X } from 'lucide-react';
import { useState } from 'react';
import type { View } from '../App';

interface TutorRequestsProps {
  onNavigate: (view: View) => void;
  currentUser: any;
}

export function TutorRequests({ onNavigate, currentUser }: TutorRequestsProps) {
  const [requests, setRequests] = useState([
    {
      id: 2,
      name: 'Carlos Silva',
      phone: '(11) 98888-7777',
      email: 'carlos.silva@email.com',
      relationship: 'Filho',
      requestedAt: '08/12/2024',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Beatriz Costa',
      phone: '(11) 97777-6666',
      email: 'beatriz.costa@email.com',
      relationship: 'Neta',
      requestedAt: '07/12/2024',
      status: 'pending'
    }
  ]);

  const handleApprove = (requestId: number) => {
    setRequests(requests.filter(r => r.id !== requestId));
    // Aqui seria feita a chamada para aprovar no backend
  };

  const handleReject = (requestId: number) => {
    setRequests(requests.filter(r => r.id !== requestId));
    // Aqui seria feita a chamada para rejeitar no backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <h1 className="text-white mb-2">Solicitações de Tutoria</h1>
        <p className="text-blue-100">Aprove ou recuse solicitações de acesso</p>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{request.name}</h3>
                    <p className="text-purple-700 mb-2">{request.relationship}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{request.phone}</span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        Solicitado em {request.requestedAt}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-blue-900 text-sm">
                    <span className="text-blue-700">{request.name}</span> deseja acompanhar seus agendamentos e ter acesso aos dados dos profissionais que você contratar.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>Recusar</span>
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-5 h-5" />
                    <span>Aprovar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Nenhuma solicitação pendente</h3>
            <p className="text-gray-600">
              Quando alguém solicitar acesso como tutor, aparecerá aqui para você aprovar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
