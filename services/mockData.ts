import { UserRole, Patient, Doctor, Appointment, LabResult, Product, MedicalRecordEvent } from '../types';

// Mock Users
export const MOCK_PATIENT: Patient = {
  id: 'p-123',
  name: 'Ana Silva',
  role: UserRole.PATIENT,
  email: 'ana.silva@email.com',
  dob: '1985-04-12',
  gender: 'F',
  bloodType: 'A+',
  allergies: ['Penicilina', 'Ácaros'],
  chronicConditions: ['Hipertensão Leve'],
  height: 165,
  weight: 68
};

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'd-1', name: 'Dr. Roberto Mendes', role: UserRole.DOCTOR, specialty: 'Cardiologia', crm: '12345-SP', email: 'roberto@saude.plus' },
  { id: 'd-2', name: 'Dra. Carla Souza', role: UserRole.DOCTOR, specialty: 'Dermatologia', crm: '67890-SP', email: 'carla@saude.plus' },
  { id: 'd-3', name: 'Dr. João Pereira', role: UserRole.DOCTOR, specialty: 'Clínico Geral', crm: '11223-SP', email: 'joao@saude.plus' },
];

// Mock Appointments
export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'apt-1', patientId: 'p-123', doctorId: 'd-1', doctorName: 'Dr. Roberto Mendes', specialty: 'Cardiologia', date: '2023-10-25', time: '14:00', status: 'COMPLETED', notes: 'Rotina' },
  { id: 'apt-2', patientId: 'p-123', doctorId: 'd-2', doctorName: 'Dra. Carla Souza', specialty: 'Dermatologia', date: '2023-11-10', time: '09:30', status: 'COMPLETED', notes: 'Alergia cutânea' },
  { id: 'apt-3', patientId: 'p-123', doctorId: 'd-1', doctorName: 'Dr. Roberto Mendes', specialty: 'Cardiologia', date: '2024-05-15', time: '10:00', status: 'SCHEDULED', notes: 'Retorno check-up' },
];

// Mock Lab Results
export const MOCK_LAB_RESULTS: LabResult[] = [
  { id: 'lab-1', patientId: 'p-123', testName: 'Glicemia em Jejum', date: '2023-10-26', value: '92', unit: 'mg/dL', referenceRange: '70-99', status: 'NORMAL' },
  { id: 'lab-2', patientId: 'p-123', testName: 'Colesterol Total', date: '2023-10-26', value: '210', unit: 'mg/dL', referenceRange: '< 190', status: 'ABNORMAL' },
  { id: 'lab-3', patientId: 'p-123', testName: 'Hemoglobina Glicada', date: '2023-10-26', value: '5.4', unit: '%', referenceRange: '4.0-5.6', status: 'NORMAL' },
  { id: 'lab-4', patientId: 'p-123', testName: 'Vitamina D', date: '2023-05-10', value: '22', unit: 'ng/mL', referenceRange: '> 20', status: 'NORMAL' },
];

// Mock Timeline
export const MOCK_TIMELINE: MedicalRecordEvent[] = [
  { id: 'evt-1', year: 2023, type: 'DIAGNOSIS', description: 'Hipertensão Arterial Sistêmica Estágio 1', details: 'Diagnosticado após MAPA 24h.' },
  { id: 'evt-2', year: 2022, type: 'SURGERY', description: 'Apendicectomia', details: 'Cirurgia videolaparoscópica sem intercorrências.' },
  { id: 'evt-3', year: 2022, type: 'MEDICATION', description: 'Início de Losartana 50mg', details: 'Uso contínuo diário.' },
  { id: 'evt-4', year: 2020, type: 'VACCINE', description: 'Febre Amarela', details: 'Dose única.' },
];

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'Vitamina C 1g', category: 'SUPPLEMENT', price: 25.90, stock: 100, requiresPrescription: false, image: 'https://picsum.photos/200/200?random=1' },
  { id: 'prod-2', name: 'Ômega 3 1000mg', category: 'SUPPLEMENT', price: 89.90, stock: 50, requiresPrescription: false, image: 'https://picsum.photos/200/200?random=2' },
  { id: 'prod-3', name: 'Monitor de Pressão Digital', category: 'DEVICE', price: 149.90, stock: 15, requiresPrescription: false, image: 'https://picsum.photos/200/200?random=3' },
  { id: 'prod-4', name: 'Amoxicilina 500mg', category: 'MEDICINE', price: 35.00, stock: 200, requiresPrescription: true, image: 'https://picsum.photos/200/200?random=4' },
];

// Simulated API calls
export const api = {
  getPatient: async () => Promise.resolve(MOCK_PATIENT),
  getAppointments: async () => Promise.resolve(MOCK_APPOINTMENTS),
  getLabResults: async () => Promise.resolve(MOCK_LAB_RESULTS),
  getTimeline: async () => Promise.resolve(MOCK_TIMELINE),
  getProducts: async () => Promise.resolve(MOCK_PRODUCTS),
  getDoctors: async () => Promise.resolve(MOCK_DOCTORS),
  bookAppointment: async (appointment: Partial<Appointment>) => {
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return { ...appointment, id: `new-${Date.now()}`, status: 'SCHEDULED' };
  }
};