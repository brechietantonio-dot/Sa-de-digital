import React, { useState } from 'react';
import { Check, Shield, Database, Smartphone, Activity, CreditCard, ShoppingBag, Building2, TrendingUp, Lock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const plans = [
  {
    name: 'Básico',
    price: '45.000',
    period: '/mês',
    target: 'Pequenas Clínicas',
    features: ['Até 2 médicos', '500 pacientes', 'Prontuário Digital', 'Agendamento Online'],
    color: 'bg-slate-100 border-slate-200',
    btn: 'text-slate-700 bg-white border border-slate-300'
  },
  {
    name: 'Profissional',
    price: '145.000',
    period: '/mês',
    target: 'Clínicas Médias',
    features: ['Até 10 médicos', '5.000 pacientes', 'Telemedicina HD', 'SMS Ilimitado', 'Integração Laboratorial'],
    color: 'bg-indigo-50 border-indigo-100',
    popular: true,
    btn: 'text-white bg-indigo-600 hover:bg-indigo-700'
  },
  {
    name: 'Hospitalar',
    price: '390.000',
    period: '/mês',
    target: 'Hospitais & Policlínicas',
    features: ['Médicos Ilimitados', 'Pacientes Ilimitados', 'API Aberta', 'Gestão de Leitos', 'Analytics Avançado'],
    color: 'bg-white border-slate-200',
    btn: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
  },
  {
    name: 'Governamental',
    price: 'Sob Consulta',
    period: '/anual',
    target: 'Setor Público',
    features: ['Infraestrutura Dedicada', 'Migração de Dados Legados', 'Customização White-label', 'SLA 99.99%', 'Auditoria Completa'],
    color: 'bg-slate-900 text-white border-slate-800',
    btn: 'text-slate-900 bg-white hover:bg-slate-100'
  }
];

const dataRevenue = [
  { name: 'Jan', value: 1200000 },
  { name: 'Fev', value: 1900000 },
  { name: 'Mar', value: 2400000 },
  { name: 'Abr', value: 2100000 },
  { name: 'Mai', value: 3200000 },
];

export const BusinessPlans: React.FC = () => {
  const [activeTab, setActiveTab] = useState('plans');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gestão Comercial & Planos</h2>
          <p className="text-slate-500">Administre assinaturas, integrações e monetização de dados.</p>
        </div>
        <div className="bg-white p-1 rounded-lg border border-slate-200 flex text-sm font-medium">
          <button 
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'plans' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Assinaturas
          </button>
          <button 
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'integrations' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Receita & Taxas
          </button>
          <button 
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'data' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Inteligência de Dados
          </button>
        </div>
      </div>

      {activeTab === 'plans' && (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative p-6 rounded-2xl border flex flex-col ${plan.color} ${plan.popular ? 'ring-2 ring-indigo-500 shadow-xl' : 'shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Mais Popular
                </div>
              )}
              <div className="mb-4">
                <h3 className={`font-bold text-lg ${plan.name === 'Governamental' ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                <p className={`text-sm ${plan.name === 'Governamental' ? 'text-slate-400' : 'text-slate-500'}`}>{plan.target}</p>
              </div>
              <div className="mb-6">
                <span className={`text-3xl font-bold ${plan.name === 'Governamental' ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name !== 'Governamental' && <span className="text-lg font-normal mr-1">Kz</span>}
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.name === 'Governamental' ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check size={16} className={`mt-0.5 ${plan.name === 'Governamental' ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className={plan.name === 'Governamental' ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-lg font-semibold transition-all ${plan.btn}`}>
                Selecionar Plano
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Lab Fees */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-2 rounded-lg text-teal-600">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Integração Laboratorial</h3>
                <p className="text-xs text-slate-500">Custo por exame processado</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">100 Kz <span className="text-sm font-normal text-slate-400">/exame</span></div>
            <p className="text-sm text-slate-600 mb-4">
              Cobrado automaticamente dos laboratórios parceiros a cada resultado entregue via API.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Exames este mês</span>
                <span className="font-bold">12.450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Receita Gerada</span>
                <span className="font-bold text-green-600">+ 1.245.000 Kz</span>
              </div>
            </div>
          </div>

          {/* Pharmacy Commission */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">E-commerce Farma</h3>
                <p className="text-xs text-slate-500">Comissão por venda (Marketplace)</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">5% - 15% <span className="text-sm font-normal text-slate-400">/venda</span></div>
            <p className="text-sm text-slate-600 mb-4">
              Taxa aplicada sobre vendas de medicamentos realizadas através da prescrição digital.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Vendas Totais</span>
                <span className="font-bold">45.000.000 Kz</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Sua Comissão</span>
                <span className="font-bold text-green-600">+ 4.500.000 Kz</span>
              </div>
            </div>
          </div>

          {/* SMS & Notifications */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Smartphone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Gateway de SMS</h3>
                <p className="text-xs text-slate-500">Notificações aos pacientes</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-800 mb-2">10 Kz <span className="text-sm font-normal text-slate-400">/envio</span></div>
            <p className="text-sm text-slate-600 mb-4">
              Custo adicional repassado para clínicas para lembretes de consulta e resultados.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Envios este mês</span>
                <span className="font-bold">5.000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Custo Total</span>
                <span className="font-bold text-red-500">- 50.000 Kz</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2 text-indigo-300 font-semibold">
                <Database size={20} />
                <span>Monetização de Dados Anonimizados</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Transforme estatísticas em receita recorrente</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Habilite a venda de relatórios epidemiológicos anonimizados para seguradoras e governos. 
                Seus dados clínicos contribuem para a saúde pública e geram receita para sua instituição.
              </p>
              <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer gap-3 bg-white/10 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </div>
                  <span className="font-medium">Compartilhamento Ativo</span>
                </label>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Shield size={12} /> Dados criptografados e anônimos (LGPD/GDPR)
                </span>
              </div>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm mt-6 md:mt-0 w-full md:w-80">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">Projeção de Ganhos (Kz)</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataRevenue}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#818cf8' }}
                      formatter={(value: number) => [`Kz ${value.toLocaleString()}`, 'Receita']}
                    />
                    <Bar dataKey="value" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-slate-400">Este mês</span>
                <span className="text-xl font-bold text-green-400">+ 3.200.000 Kz</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             {/* Premium Patient Plan */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                      <Lock size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">Plano Premium Paciente</h3>
                  </div>
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded">B2C</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Oferte aos seus pacientes: Histórico Vitalício, Agendamento Prioritário e Armazenamento de Imagens DICOM ilimitado.
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-800">4.500 Kz <span className="text-sm font-normal text-slate-400">/mês</span></span>
                  <button className="text-indigo-600 font-medium text-sm hover:underline">Configurar Benefícios</button>
                </div>
             </div>

             {/* Enterprise Customization */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                      <Building2 size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800">Enterprise & Customizações</h3>
                  </div>
                  <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Projetos</span>
                </div>
                <p className="text-slate-600 text-sm mb-4">
                  Cobrança por desenvolvimento de recursos exclusivos, White-label app, ou integrações com sistemas legados do governo.
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Projetos a partir de</span>
                    <span className="text-xl font-bold text-slate-800">5.000.000 Kz+</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700">Solicitar Orçamento</button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};