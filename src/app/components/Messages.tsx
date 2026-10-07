import { useState } from 'react';
import { ArrowLeft, Send, Phone } from 'lucide-react';
import type { View, UserType } from '../App';

interface MessagesProps {
  onNavigate: (view: View) => void;
  userType: UserType;
}

const conversations = [
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Tutora',
    lastMessage: 'Pode confirmar o horário de amanhã?',
    time: '10:30',
    unread: 2,
    phone: '(11) 91234-5678',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Maria Silva',
    role: 'Cuidadora',
    lastMessage: 'Entendido, estarei lá às 14h',
    time: 'Ontem',
    unread: 0,
    phone: '(11) 99999-1111',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  }
];

export function Messages({ onNavigate, userType }: MessagesProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { id: 1, sender: 'other', text: 'Olá! Tudo bem?', time: '10:25' },
    { id: 2, sender: 'other', text: 'Pode confirmar o horário de amanhã?', time: '10:30' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setMessage('');
  };

  const getBackView = (): View => {
    if (userType === 'tutor') return 'tutor';
    if (userType === 'partner') return 'partner';
    return 'home';
  };

  if (selectedChat === null) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 pb-8">
          <button
            onClick={() => onNavigate(getBackView())}
            className="flex items-center gap-2 mb-6 active:opacity-70"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="text-lg">Voltar</span>
          </button>
          <h1 className="text-white mb-2">Mensagens</h1>
          <p className="text-blue-100">Suas conversas</p>
        </div>

        <div className="max-w-md mx-auto px-6 -mt-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {conversations.map((conv, index) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== conversations.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.photo}
                    alt={conv.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full text-xs flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900">{conv.name}</h3>
                    <span className="text-gray-500 text-sm">{conv.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{conv.role}</p>
                  <p className="text-gray-600 text-sm truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentConv = conversations.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => setSelectedChat(null)}
            className="flex items-center gap-2 active:opacity-70"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 flex-1 mx-4">
            <img
              src={currentConv?.photo}
              alt={currentConv?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-white">{currentConv?.name}</p>
              <p className="text-blue-100 text-sm">{currentConv?.role}</p>
            </div>
          </div>
          <a
            href={`tel:${currentConv?.phone}`}
            className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400"
          >
            <Phone className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
        <div className="space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                }`}
              >
                <p>{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
