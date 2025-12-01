import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { getAIHealthSummary, getSymtomChecker } from '../services/geminiService';
import { api } from '../services/mockData';

export const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');
  const [loading, setLoading] = useState(false);
  
  // Summary State
  const [summaryData, setSummaryData] = useState<any>(null);

  // Chat State
  const [input, setInput] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const [patient, labs] = await Promise.all([api.getPatient(), api.getLabResults()]);
      const result = await getAIHealthSummary(patient, labs);
      setSummaryData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const response = await getSymtomChecker(input);
    setChatResponse(response);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300" />
            <h3 className="font-bold">Assistente IA Saúde+</h3>
        </div>
        <div className="text-xs bg-indigo-500 px-2 py-1 rounded">
            Powered by Gemini
        </div>
      </div>

      <div className="flex border-b border-slate-100">
        <button 
          onClick={() => setActiveTab('summary')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'summary' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
        >
          Análise de Exames
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-sm font-medium ${activeTab === 'chat' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
        >
          Tira-Dúvidas
        </button>
      </div>

      <div className="p-6 min-h-[300px]">
        {activeTab === 'summary' && (
          <div className="space-y-4">
            {!summaryData ? (
              <div className="text-center py-8">
                <Bot size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 mb-4">A IA pode analisar seus últimos exames e sugerir melhorias.</p>
                <button 
                  onClick={handleGenerateSummary}
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 disabled:opacity-50 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Gerar Análise Completa'}
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold text-indigo-900 mb-1">Resumo</h4>
                    <p className="text-indigo-800 text-sm">{summaryData.summary}</p>
                </div>
                
                <h4 className="font-bold text-slate-700 mt-4 mb-2 text-sm uppercase">Pontos de Atenção</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                    {summaryData.analysis.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-slate-600">{item}</li>
                    ))}
                </ul>

                <h4 className="font-bold text-slate-700 mt-4 mb-2 text-sm uppercase">Recomendações</h4>
                <div className="grid gap-2">
                    {summaryData.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="bg-green-50 text-green-800 p-3 rounded text-sm border border-green-100">
                            {rec}
                        </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-slate-50 rounded-lg p-4 mb-4 min-h-[200px] overflow-y-auto">
                {!chatResponse && <p className="text-slate-400 text-center text-sm mt-10">Descreva o que está sentindo...</p>}
                {chatResponse && (
                    <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line">
                        {chatResponse}
                    </div>
                )}
            </div>
            
            <div className="flex gap-2">
                <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                    placeholder="Ex: Dor de cabeça frontal há 2 dias..."
                    className="flex-1 border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button 
                    onClick={handleChat}
                    disabled={loading}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>}
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};