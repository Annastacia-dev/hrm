import { CompanyEquipment } from './company-equipment';
import { SalaryDetails } from './salary-details';
import { Certifications } from './certifications';
import { PersonalDocuments } from './personal-documents';

export type User = {
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string;
  id_number: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  employment_status: string;
  date_of_joining: string;
  date_of_birth: string;
  profile_picture: string;
  job_title: string;
  department: string;
  active: boolean;
  skills?: string[];
  company_equipment: CompanyEquipment[];
  salary_details: SalaryDetails[];
  certifications: Certifications[];
  personal_documents: PersonalDocuments[];
};

export const UserDefaults = {
  first_name: '',
  middle_name: '',
  last_name: '',
  password: '',
  id_number: '',
  email: '',
  phone_number: '',
  address: '',
  role: '',
  employment_status: '',
  date_of_joining: '',
  date_of_birth: '',
  profile_picture: '',
} as const;
