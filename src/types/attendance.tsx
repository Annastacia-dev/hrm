export interface Attendance {
  id?: number;
  employee_id?: number;
  date: string;
  clock_in_time: string;
  clock_out_time?: string | null;
  location?: 'on-site' | 'remote';
}
