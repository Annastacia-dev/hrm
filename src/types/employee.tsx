import { CompanyEquipment } from './company-equipment';
import { SalaryDetails } from './salary-details';
import { Certifications } from './certifications';
import { PersonalDocuments } from './personal-documents';
import { Attendance } from './attendance';

export type Employee = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string;
  id_number: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  employment_status: string;
  date_of_joining: string;
  date_of_birth: string;
  profile_picture: string;
  job_role: string;
  department_name: string;
  active: boolean;
  skills?: string[];
  company_equipment: CompanyEquipment[];
  salary_details: SalaryDetails[];
  certifications: Certifications[];
  personal_documents: PersonalDocuments[];
  attendances?: Attendance[];
  recentLeaveRequest?: {
    type: string;
    status: string;
    startDate: string;
    endDate: string;
  };
};
