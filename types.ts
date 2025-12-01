export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  PHARMACIST = 'PHARMACIST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email: string;
}

export interface Patient extends User {
  dob: string;
  gender: 'M' | 'F' | 'Other';
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  height: number; // cm
  weight: number; // kg
}

export interface Doctor extends User {
  specialty: string;
  crm: string; // Medical license number
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string; // Denormalized for simpler UI
  specialty: string;
  date: string; // ISO Date
  time: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'WAITING_LIST';
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  testName: string;
  date: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'NORMAL' | 'ABNORMAL' | 'CRITICAL';
  fileUrl?: string; // Mock URL for PDF
}

export interface Product {
  id: string;
  name: string;
  category: 'MEDICINE' | 'SUPPLEMENT' | 'DEVICE';
  price: number;
  stock: number;
  image: string;
  requiresPrescription: boolean;
}

export interface MedicalRecordEvent {
  id: string;
  year: number;
  type: 'DIAGNOSIS' | 'SURGERY' | 'MEDICATION' | 'VACCINE';
  description: string;
  details: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}