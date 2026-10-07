import { motion } from 'motion/react';
import { Heart, MapPin, Stethoscope, Activity, Users, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-blue-100 overflow-hidden relative">
      {/* Sky and Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-16 bg-white rounded-full opacity-70"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-40 h-20 bg-white rounded-full opacity-60"
          animate={{ x: [0, -80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-32 left-1/3 w-24 h-12 bg-white rounded-full opacity-50"
          animate={{ x: [0, 60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* City Buildings Background */}
      <div className="absolute bottom-0 left-0 right-0 h-96 flex items-end justify-center gap-4 px-8">
        {/* Hospital */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="w-32 h-64 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-lg relative shadow-lg">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-5 h-1 bg-white absolute" />
              <div className="w-1 h-5 bg-white absolute" />
            </div>
            {/* Windows */}
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute grid grid-cols-3 gap-2 px-4 mt-16">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="w-6 h-6 bg-yellow-200 rounded-sm"
                    style={{ top: `${Math.floor(i / 3) * 40 + 20}px`, left: `${(j * 28) + 16}px`, position: 'absolute' }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-blue-700 text-xs whitespace-nowrap">
            Hospital
          </div>
        </motion.div>

        {/* Park/Trees */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex gap-2 items-end mb-4"
        >
          <div className="w-4 h-32 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full" />
          <div className="w-16 h-20 bg-green-500 rounded-full" />
          <div className="w-4 h-28 bg-gradient-to-t from-green-700 to-green-600 rounded-t-full" />
          <div className="w-12 h-16 bg-green-500 rounded-full" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-green-700 text-xs whitespace-nowrap">
            Parque
          </div>
        </motion.div>

        {/* Clinic */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative"
        >
          <div className="w-28 h-48 bg-gradient-to-b from-purple-300 to-purple-400 rounded-t-lg shadow-lg relative">
            <Stethoscope className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-white" />
            {/* Windows */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-5 h-5 bg-blue-100 rounded-sm"
                style={{ 
                  top: `${Math.floor(i / 2) * 30 + 50}px`, 
                  left: `${(i % 2) * 36 + 16}px` 
                }}
              />
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-purple-700 text-xs whitespace-nowrap">
            Clínica
          </div>
        </motion.div>

        {/* Medical Lab */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          <div className="w-24 h-40 bg-gradient-to-b from-teal-300 to-teal-400 rounded-t-lg shadow-lg relative">
            <Activity className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 text-white" />
            {/* Windows */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-5 h-5 bg-cyan-100 rounded-sm"
                style={{ 
                  top: `${Math.floor(i / 2) * 28 + 50}px`, 
                  left: `${(i % 2) * 28 + 12}px` 
                }}
              />
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-teal-700 text-xs whitespace-nowrap">
            Lab. Exames
          </div>
        </motion.div>
      </div>

      {/* Walking People (Elderly) */}
      <div className="absolute bottom-20 left-0 right-0">
        {/* Person 1 - Walking right */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-pink-300 rounded-full mb-1" />
            <div className="w-10 h-16 bg-pink-400 rounded-lg mx-auto" />
            <motion.div
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -left-2 w-3 h-8 bg-pink-400 rounded-full origin-top"
            />
            <motion.div
              animate={{ rotate: [0, -20, 0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -right-2 w-3 h-8 bg-pink-400 rounded-full origin-top"
            />
          </div>
        </motion.div>

        {/* Person 2 - Walking left */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [window.innerWidth + 100, -100] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-blue-300 rounded-full mb-1" />
            <div className="w-10 h-16 bg-blue-400 rounded-lg mx-auto" />
            <motion.div
              animate={{ rotate: [0, -20, 0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -left-2 w-3 h-8 bg-blue-400 rounded-full origin-top"
            />
            <motion.div
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute top-12 -right-2 w-3 h-8 bg-blue-400 rounded-full origin-top"
            />
          </div>
        </motion.div>

        {/* Person 3 - Walking right slow */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 10 }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-purple-300 rounded-full mb-1" />
            <div className="w-10 h-16 bg-purple-400 rounded-lg mx-auto" />
            <motion.div
              animate={{ rotate: [0, 20, 0, -20, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute top-12 -left-2 w-3 h-8 bg-purple-400 rounded-full origin-top"
            />
            <motion.div
              animate={{ rotate: [0, -20, 0, 20, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="absolute top-12 -right-2 w-3 h-8 bg-purple-400 rounded-full origin-top"
            />
          </div>
        </motion.div>

        {/* Couple walking together */}
        <motion.div
          className="absolute bottom-0"
          animate={{ x: [-150, window.innerWidth + 150] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 15 }}
        >
          <div className="flex gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-300 rounded-full mb-1" />
              <div className="w-10 h-16 bg-orange-400 rounded-lg" />
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-12 -left-2 w-3 h-8 bg-orange-400 rounded-full origin-top"
              />
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-yellow-300 rounded-full mb-1" />
              <div className="w-10 h-16 bg-yellow-400 rounded-lg" />
              <motion.div
                animate={{ rotate: [0, 15, 0, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute top-12 -right-2 w-3 h-8 bg-yellow-400 rounded-full origin-top"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center max-w-2xl"
        >
          {/* Logo */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Heart className="w-16 h-16 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-blue-900 mb-4"
          >
            CuidaFácil
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-gray-700 text-2xl mb-8 leading-relaxed"
          >
            Liberdade e Autonomia para Viver com Dignidade
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-blue-900 mb-2">Cuidadores</h3>
              <p className="text-gray-600">
                Profissionais qualificados para acompanhamento
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-green-900 mb-2">Transporte</h3>
              <p className="text-gray-600">
                Motoristas parceiros com veículos adaptados
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-purple-900 mb-2">Saúde</h3>
              <p className="text-gray-600">
                Consultas, exames e acompanhamento médico
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnter}
            className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto"
          >
            Começar Agora
            <ArrowRight className="w-6 h-6" />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-gray-600 mt-6"
          >
            Sua independência é nossa prioridade
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-30"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-12 h-12 bg-purple-200 rounded-full opacity-30"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-green-200 rounded-full opacity-30"
        animate={{ 
          y: [0, -15, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
    </div>
  );
}
