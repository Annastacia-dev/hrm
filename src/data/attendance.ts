import { addDays, setHours, setMinutes } from 'date-fns';
import { Attendance } from '../types/attendance';

const generateSampleData = (): Attendance[] => {
  const startDate = new Date(2024, 0, 1); // Start from January 1, 2024
  const endDate = new Date(); // Current date
  const data: Attendance[] = [];
  let id = 1;

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const dayOfWeek = date.getDay();

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      continue;
    }

    const random = Math.random();
    let status: 'present' | 'late' | 'absent';
    let checkIn: Date | null = null;
    let checkOut: Date | null = null;
    let hours = 0;
    let notes = '';

    if (random > 0.1) {
      // Present
      status = 'present';
      checkIn = setMinutes(
        setHours(new Date(date), 9),
        Math.floor(Math.random() * 15)
      );
      checkOut = setMinutes(
        setHours(new Date(date), 17),
        Math.floor(Math.random() * 30)
      );
      hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    } else if (random > 0.05) {
      // Late
      status = 'late';
      checkIn = setMinutes(
        setHours(new Date(date), 9),
        30 + Math.floor(Math.random() * 60)
      );
      checkOut = setMinutes(
        setHours(new Date(date), 17),
        30 + Math.floor(Math.random() * 60)
      );
      hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      notes = 'Arrived late';
    } else {
      // Absent
      status = 'absent';
      notes = 'Sick leave';
    }

    data.push({
      id: id++,
      date: date.toISOString(),
      status,
      checkIn,
      checkOut,
      hours: Number(hours.toFixed(2)),
      notes,
    });
  }

  return data;
};

export const sampleAttendanceData = generateSampleData();
