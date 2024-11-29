import { useState } from 'react';
import { format, isSameMonth, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Attendance } from '@/types/attendance';

interface AttendanceCalendarProps {
  attendanceData: Attendance[];
  currentDate: Date;
  onSelectDate: (_date: Date) => void;
}

export function AttendanceCalendar({
  attendanceData,
  currentDate,
  onSelectDate,
}: AttendanceCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    currentDate
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-500';
      case 'late':
        return 'bg-yellow-500';
      case 'absent':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onSelectDate(date);
    }
  };

  return (
    <TooltipProvider>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
        components={{
          Day: ({ date, ...props }) => {
            const attendance = attendanceData.find((record) =>
              isSameDay(record.date, date)
            );
            return (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    {...props}
                    className={cn(
                      'relative h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                      attendance && isSameMonth(date, currentDate)
                        ? getStatusColor(attendance.status || '')
                        : null
                    )}
                  >
                    <time dateTime={format(date, 'yyyy-MM-dd')}>
                      {format(date, 'd')}
                    </time>
                  </div>
                </TooltipTrigger>
                {attendance && (
                  <TooltipContent>
                    <p>Date: {format(date, 'MMM dd, yyyy')}</p>
                    <p>Status: {attendance.status}</p>
                    <p>Hours: {attendance.hours?.toFixed(2)}</p>
                    {attendance.notes && <p>Notes: {attendance.notes}</p>}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          },
        }}
      />
    </TooltipProvider>
  );
}
