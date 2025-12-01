import React, { useState } from 'react';
import { Mail, Lock, Phone, User, ArrowRight, Loader2, HeartPulse } from 'lucide-react';

interface AuthProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      // For demo purposes, we log in with whatever was typed or default mock data
      onLogin({
        name: name || 'Ana Silva',
        email: email || 'ana.silva@email.com'
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side - Brand / Decoration */}
        <div className="md:w-1/2 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <HeartPulse size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">SaúdeDigital+</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? 'Bem-vindo de volta.' : 'Comece sua jornada de saúde.'}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Acesse sua gestão médica, agendamentos e farmácia em uma única plataforma integrada e segura.
            </p>
          </div>

          <div className="relative z-10 mt-12 md:mt-0">
            <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700">
              <p className="text-sm italic text-slate-300">"A melhor plataforma de gestão de saúde que já utilizei. Simples, rápida e conecta tudo o que preciso."</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">JD</div>
                <span className="text-xs font-medium text-slate-400">João D., Paciente verificado</span>
              </div>
            </div>
          </div>

          {/* Abstract Circle Decoration */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-12 -left-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8 md:hidden">
             <div className="flex items-center justify-center gap-2 mb-2">
              <HeartPulse size={24} className="text-indigo-600" />
              <span className="text-xl font-bold text-slate-800">SaúdeDigital+</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Acesse sua conta' : 'Crie sua conta grátis'}
            </h3>
            <p className="text-slate-500 text-sm">
              {isLogin 
                ? 'Entre com seus dados para continuar.' 
                : 'Preencha os campos abaixo para se cadastrar.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    type="text"
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="email"
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Celular</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input 
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  type="password"
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              {isLogin && (
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Esqueceu a senha?</a>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Cadastrar'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              {isLogin ? 'Não tem uma conta?' : 'Já possui cadastro?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-indigo-600 font-bold hover:underline focus:outline-none"
              >
                {isLogin ? 'Cadastre-se' : 'Fazer Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};