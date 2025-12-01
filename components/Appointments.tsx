import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Search } from 'lucide-react';
import { api } from '../services/mockData';
import { Appointment, Doctor } from '../types';

export const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [aptData, docData] = await Promise.all([api.getAppointments(), api.getDoctors()]);
      setAppointments(aptData);
      setDoctors(docData);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleBook = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;
    
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;

    const newApt: any = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      time: selectedTime,
      patientId: 'p-123',
      status: 'SCHEDULED',
      notes: 'Novo agendamento via App'
    };

    setLoading(true);
    await api.bookAppointment(newApt);
    
    // Refresh mock data locally for UI update
    setAppointments([...appointments, { ...newApt, id: Date.now().toString() }]);
    setShowNewModal(false);
    setLoading(false);
    
    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Meus Agendamentos</h2>
          <p className="text-slate-500">Gerencie suas consultas e retornos.</p>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          Nova Consulta
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                apt.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                apt.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {apt.status === 'COMPLETED' ? 'Realizada' : apt.status === 'SCHEDULED' ? 'Agendada' : apt.status}
              </div>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <Clock size={14} /> {apt.time}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg mb-1">{apt.specialty}</h3>
            <div className="flex items-center gap-2 text-slate-600 mb-3">
              <User size={16} />
              <span className="text-sm">{apt.doctorName}</span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-500 text-sm pt-3 border-t border-slate-100">
              <Calendar size={16} />
              {new Date(apt.date).toLocaleDateString('pt-BR')}
              <div className="ml-auto flex gap-1 items-center text-indigo-600 cursor-pointer hover:underline">
                <MapPin size={14} />
                Unidade Centro
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 m-4 shadow-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Agendar Consulta</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Especialidade / Médico</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} - {d.specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                <input 
                  type="date" 
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Horário</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:30">15:30</option>
                </select>
              </div>

              <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg">
                * Sistema anti-conflito ativo. Horários indisponíveis foram ocultados.
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowNewModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleBook}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Agendando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};