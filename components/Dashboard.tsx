import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, Calendar, Activity } from 'lucide-react';

const dataOccupancy = [
  { name: 'Seg', val: 85 },
  { name: 'Ter', val: 92 },
  { name: 'Qua', val: 78 },
  { name: 'Qui', val: 95 },
  { name: 'Sex', val: 88 },
  { name: 'Sab', val: 60 },
];

const dataExams = [
  { name: 'Jan', val: 400 },
  { name: 'Fev', val: 300 },
  { name: 'Mar', val: 550 },
  { name: 'Abr', val: 480 },
  { name: 'Mai', val: 600 },
];

const StatCard = ({ icon: Icon, title, value, sub, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <span className={`text-xs font-semibold ${sub.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
        {sub} vs mês anterior
      </span>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Visão Geral da Clínica</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Pacientes Ativos" value="1,284" sub="+12%" color="bg-blue-500" />
        <StatCard icon={Calendar} title="Consultas Hoje" value="42" sub="+5%" color="bg-indigo-500" />
        <StatCard icon={Activity} title="Exames Realizados" value="156" sub="+8%" color="bg-teal-500" />
        <StatCard icon={TrendingUp} title="Receita (Est.)" value="R$ 45k" sub="-2%" color="bg-rose-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Ocupação Semanal da Agenda (%)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataOccupancy}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="val" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Volume de Exames Laboratoriais</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataExams}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="val" stroke="#0d9488" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};