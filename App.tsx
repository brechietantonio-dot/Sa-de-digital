import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Appointments } from './components/Appointments';
import { PatientRecord } from './components/PatientRecord';
import { Pharmacy } from './components/Pharmacy';
import { BusinessPlans } from './components/BusinessPlans';
import { AIAssistant } from './components/AIAssistant';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Ana Silva', email: 'ana.silva@email.com' });
  const [currentTab, setCurrentTab] = useState('dashboard');

  const handleLogin = (userData: { name: string; email: string }) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentTab('dashboard');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Dashboard />
            <div className="grid lg:grid-cols-2 gap-6">
               {/* Integrating AI Assistant into Dashboard for high visibility */}
               <AIAssistant />
            </div>
          </div>
        );
      case 'appointments':
        return <Appointments />;
      case 'records':
        return <PatientRecord />;
      case 'pharmacy':
        return <Pharmacy />;
      case 'business':
        return <BusinessPlans />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentTab={currentTab} 
      onTabChange={setCurrentTab}
    >
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {currentTab === 'dashboard' && 'Painel de Controle'}
            {currentTab === 'appointments' && 'Agendamentos'}
            {currentTab === 'records' && 'Prontuário Digital'}
            {currentTab === 'pharmacy' && 'Farmácia & Produtos'}
            {currentTab === 'business' && 'Gestão & Negócios'}
          </h1>
          <p className="text-slate-500 text-sm">Bem-vindo(a) de volta, {currentUser.name}.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-sm font-bold text-slate-700">{currentUser.name}</span>
            <span className="text-xs text-slate-400">Paciente Premium</span>
          </div>
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {currentUser.name.charAt(0)}
          </div>
          <button 
            onClick={handleLogout} 
            className="md:hidden text-xs text-rose-500 font-medium"
          >
            Sair
          </button>
        </div>
      </header>
      
      {renderContent()}
    </Layout>
  );
};

export default App;