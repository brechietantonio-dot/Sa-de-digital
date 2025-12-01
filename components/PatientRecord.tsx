import React, { useEffect, useState } from 'react';
import { api } from '../services/mockData';
import { MedicalRecordEvent, Patient } from '../types';
import { FileText, Activity, AlertTriangle, Syringe, Pill, Stethoscope } from 'lucide-react';

const EventIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'DIAGNOSIS': return <Stethoscope className="text-white" size={18} />;
    case 'SURGERY': return <Activity className="text-white" size={18} />;
    case 'MEDICATION': return <Pill className="text-white" size={18} />;
    case 'VACCINE': return <Syringe className="text-white" size={18} />;
    default: return <FileText className="text-white" size={18} />;
  }
};

const EventColor = (type: string) => {
  switch (type) {
    case 'DIAGNOSIS': return 'bg-red-500';
    case 'SURGERY': return 'bg-purple-500';
    case 'MEDICATION': return 'bg-blue-500';
    case 'VACCINE': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const PatientRecord: React.FC = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [timeline, setTimeline] = useState<MedicalRecordEvent[]>([]);

  useEffect(() => {
    const load = async () => {
      const [p, t] = await Promise.all([api.getPatient(), api.getTimeline()]);
      setPatient(p);
      setTimeline(t);
    };
    load();
  }, []);

  if (!patient) return <div className="p-10 text-center text-slate-400">Carregando prontuário...</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Sidebar Info */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mb-3">
              {patient.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-slate-800">{patient.name}</h2>
            <p className="text-slate-500">{new Date().getFullYear() - new Date(patient.dob).getFullYear()} anos • {patient.gender === 'F' ? 'Feminino' : 'Masculino'}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Tipo Sanguíneo</span>
              <span className="font-semibold text-slate-700">{patient.bloodType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Peso</span>
              <span className="font-semibold text-slate-700">{patient.weight} kg</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Altura</span>
              <span className="font-semibold text-slate-700">{patient.height} cm</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Alertas Médicos
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Alergias</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {patient.allergies.map(a => (
                  <span key={a} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm">{a}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Condições Crônicas</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {patient.chronicConditions.map(c => (
                  <span key={c} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-sm">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timeline */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Linha do Tempo Clínica</h2>
          
          <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 pb-8">
            {timeline.map((event) => (
              <div key={event.id} className="relative pl-8">
                <div className={`absolute -left-[11px] top-1 w-6 h-6 rounded-full ${EventColor(event.type)} flex items-center justify-center border-2 border-white shadow-sm`}>
                  <EventIcon type={event.type} />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mb-1 sm:mb-0">
                    {event.year}
                  </span>
                  <span className="text-xs text-slate-400">{event.type}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-slate-800">{event.description}</h3>
                <p className="text-slate-500 mt-1 text-sm">{event.details}</p>
                
                {event.type === 'DIAGNOSIS' && (
                  <div className="mt-3">
                     <button className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
                       <FileText size={12} /> Ver laudo original
                     </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};