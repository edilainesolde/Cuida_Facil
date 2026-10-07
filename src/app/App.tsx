import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { FindCaregiver } from './components/FindCaregiver';
import { FindDriver } from './components/FindDriver';
import { Appointment } from './components/Appointment';
import { Profile } from './components/Profile';
import { TutorDashboard } from './components/TutorDashboard';
import { PartnerProfile } from './components/PartnerProfile';
import { Messages } from './components/Messages';
import { TutorRequests } from './components/TutorRequests';
import { ManageTutors } from './components/ManageTutors';
import { PartnerRequests } from './components/PartnerRequests';

export type View = 'landing' | 'login' | 'home' | 'caregiver' | 'driver' | 'appointment' | 'profile' | 'tutor' | 'partner' | 'messages' | 'tutor-requests' | 'manage-tutors' | 'partner-requests';
export type UserType = 'user' | 'tutor' | 'partner' | null;

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (type: UserType, userData: any) => {
    setUserType(type);
    setCurrentUser(userData);
    if (type === 'tutor') {
      setCurrentView('tutor');
    } else if (type === 'partner') {
      setCurrentView('partner');
    } else {
      setCurrentView('home');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onEnter={() => setCurrentView('login')} />;
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'caregiver':
        return <FindCaregiver onNavigate={setCurrentView} onSelect={setSelectedService} />;
      case 'driver':
        return <FindDriver onNavigate={setCurrentView} onSelect={setSelectedService} />;
      case 'appointment':
        return <Appointment onNavigate={setCurrentView} service={selectedService} />;
      case 'profile':
        return <Profile onNavigate={setCurrentView} service={selectedService} currentUser={currentUser} />;
      case 'tutor':
        return <TutorDashboard onNavigate={setCurrentView} currentUser={currentUser} />;
      case 'partner':
        return <PartnerProfile onNavigate={setCurrentView} currentUser={currentUser} />;
      case 'messages':
        return <Messages onNavigate={setCurrentView} userType={userType} />;
      case 'tutor-requests':
        return <TutorRequests onNavigate={setCurrentView} currentUser={currentUser} />;
      case 'manage-tutors':
        return <ManageTutors onNavigate={setCurrentView} currentUser={currentUser} />;
      case 'partner-requests':
        return <PartnerRequests onNavigate={setCurrentView} currentUser={currentUser} />;
      default:
        return <LandingPage onEnter={() => setCurrentView('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  );
}