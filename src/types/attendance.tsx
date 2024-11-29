export interface Attendance {
  id?: number;
  employee_id?: number;
  date: string;
  checkIn?: Date | string | null;
  checkOut?: Date | string | null;
  location?: 'on-site' | 'remote';
  status?: string;
  hours?: number;
  notes?: string;
}
