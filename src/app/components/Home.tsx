import { Heart, Car, User } from 'lucide-react';
import type { View } from '../App';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-blue-900 mb-2">CuidaFácil</h1>
          <p className="text-gray-600 text-xl">Cuidado e transporte quando você precisa</p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4 flex-1">
          <button
            onClick={() => onNavigate('caregiver')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-blue-900 mb-1">Encontrar Cuidador</h2>
                <p className="text-gray-600">Para consultas e exames</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('driver')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Car className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-green-900 mb-1">Encontrar Transporte</h2>
                <p className="text-gray-600">Motoristas parceiros disponíveis</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center justify-center gap-3 py-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-lg">Meu Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
