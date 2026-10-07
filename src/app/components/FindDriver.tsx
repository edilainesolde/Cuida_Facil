import { ArrowLeft, Star, MapPin, Clock, Car, Search } from 'lucide-react';
import type { View } from '../App';
import { useState } from 'react';

interface FindDriverProps {
  onNavigate: (view: View) => void;
  onSelect: (service: any) => void;
}

const drivers = [
  {
    id: 1,
    name: 'Carlos Oliveira',
    rating: 4.9,
    reviews: 203,
    experience: '6 anos de experiência',
    location: 'Centro, São Paulo',
    availability: 'Disponível agora',
    vehicle: 'Toyota Corolla 2022',
    features: ['Ar condicionado', 'Assento confortável', 'Cadeira de rodas'],
    price: 'R$ 50/corrida',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Roberto Mendes',
    rating: 4.8,
    reviews: 178,
    experience: '4 anos de experiência',
    location: 'Zona Norte, São Paulo',
    availability: 'Disponível hoje',
    vehicle: 'Honda Civic 2021',
    features: ['Ar condicionado', 'Veículo adaptado'],
    price: 'R$ 45/corrida',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Paulo Ferreira',
    rating: 5.0,
    reviews: 245,
    experience: '9 anos de experiência',
    location: 'Zona Leste, São Paulo',
    availability: 'Disponível agora',
    vehicle: 'Volkswagen Virtus 2023',
    features: ['Ar condicionado', 'Cadeira de rodas', 'Macas'],
    price: 'R$ 55/corrida',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
  }
];

export function FindDriver({ onNavigate, onSelect }: FindDriverProps) {
  const [cep, setCep] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);

  const handleSelect = (driver: typeof drivers[0]) => {
    onSelect({ type: 'driver', data: driver });
    onNavigate('appointment');
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  const searchByCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      alert('Por favor, digite um CEP válido com 8 dígitos');
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado. Verifique e tente novamente.');
        setIsSearching(false);
        return;
      }

      // Atualiza a localização da busca
      const locationText = `${data.bairro}, ${data.localidade}`;
      setSearchLocation(locationText);

      // Filtra motoristas por bairro ou cidade
      const filtered = drivers.filter(driver => 
        driver.location.toLowerCase().includes(data.bairro.toLowerCase()) ||
        driver.location.toLowerCase().includes(data.localidade.toLowerCase())
      );

      setFilteredDrivers(filtered.length > 0 ? filtered : drivers);
    } catch (error) {
      alert('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setCep('');
    setSearchLocation('');
    setFilteredDrivers(drivers);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 pb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 active:opacity-70"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg">Voltar</span>
        </button>
        <h1 className="text-white mb-2">Encontrar Transporte</h1>
        <p className="text-green-100">Motoristas parceiros com veículos adaptados</p>
      </div>

      {/* Search by CEP */}
      <div className="max-w-md mx-auto px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 border-2 border-gray-100">
          <label className="block text-gray-700 mb-3">
            Buscar por CEP
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              maxLength={9}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-600"
            />
            <button
              onClick={searchByCep}
              disabled={isSearching}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
          {searchLocation && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-gray-600">
                Buscando em: <span className="text-green-600">{searchLocation}</span>
              </p>
              <button
                onClick={clearSearch}
                className="text-green-600 hover:underline text-sm"
              >
                Limpar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drivers List */}
      <div className="max-w-md mx-auto px-6">
        {filteredDrivers.length === 0 && searchLocation ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-gray-100">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Nenhum motorista encontrado</h3>
            <p className="text-gray-600 mb-4">
              Não encontramos motoristas em {searchLocation}. Mostrando todos os motoristas disponíveis.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDrivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100"
              >
                <div className="p-5">
                  <div className="flex gap-4 mb-4">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 mb-1">{driver.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-900">{driver.rating}</span>
                        </div>
                        <span className="text-gray-500">({driver.reviews} avaliações)</span>
                      </div>
                      <p className="text-gray-600">{driver.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-gray-600">
                      <Car className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{driver.vehicle}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{driver.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <Clock className="w-5 h-5 flex-shrink-0" />
                      <span>{driver.availability}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {driver.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-gray-500 text-sm">Valor</p>
                      <p className="text-green-600 text-xl">{driver.price}</p>
                    </div>
                    <button
                      onClick={() => handleSelect(driver)}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors active:scale-95"
                    >
                      Solicitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}