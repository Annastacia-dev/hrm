'use client';

import { useState } from 'react';
import { format, isSameDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { sampleAttendanceData } from '@/data/attendance';
import { AttendanceCalendar } from './attendance-calendar';
import { LeaveRequests } from './leave-request';
import { AttendanceGraph } from './attendance-graph';
import { Attendance } from '@/types/attendance';

const UserAttendanceHistory = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData] = useState<Attendance[]>(sampleAttendanceData);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500">Late</Badge>;
      case 'absent':
        return <Badge className="bg-red-500">Absent</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  const formatTime = (date: Date | null) => {
    return date ? format(date, 'HH:mm') : '-';
  };

  const getDailyAttendance = (date: Date) => {
    return attendanceData.filter((record) => isSameDay(record.date, date));
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Attendance History</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{format(currentDate, 'MMMM yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceCalendar
              attendanceData={attendanceData.map(record => ({
                ...record,
                date: format(record.date, 'yyyy-MM-dd')
              }))}
              currentDate={currentDate}
              onSelectDate={setSelectedDate}
            />
          </CardContent>
        </Card>
        <LeaveRequests />
      </div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            Daily Attendance: {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getDailyAttendance(selectedDate).map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{getStatusBadge(record.status || '')}</TableCell>
                  <TableCell>{formatTime(record.checkIn as Date)}</TableCell>
                  <TableCell>{formatTime(record.checkOut as Date)}</TableCell>
                  <TableCell>{record.hours?.toFixed(2)}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AttendanceGraph />
    </div>
  );
};

export default UserAttendanceHistory;
