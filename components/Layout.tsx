import React from 'react';
import { LayoutDashboard, CalendarDays, FileText, ShoppingBag, Settings, LogOut, HeartPulse, CreditCard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Agendamentos', icon: CalendarDays },
    { id: 'records', label: 'Prontuário', icon: FileText },
    { id: 'pharmacy', label: 'Farmácia', icon: ShoppingBag },
    { id: 'business', label: 'Planos & Receita', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full hidden md:flex flex-col z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <HeartPulse size={24} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SaúdeDigital+</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentTab === item.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Settings size={20} />
            <span>Configurações</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-20 p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <HeartPulse size={24} className="text-indigo-500" />
          <span className="font-bold">SaúdeDigital+</span>
        </div>
        {/* Simple mobile menu trigger placeholder */}
        <div className="text-xs text-slate-400">Menu</div>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 pt-20 md:pt-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};