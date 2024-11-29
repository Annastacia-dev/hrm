'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const attendanceRecords = [
  {
    id: 1,
    name: 'Alice Johnson',
    date: '2023-11-29',
    status: 'Present',
    timeIn: '08:55 AM',
    timeOut: '05:05 PM',
  },
  {
    id: 2,
    name: 'Bob Smith',
    date: '2023-11-29',
    status: 'Late',
    timeIn: '09:15 AM',
    timeOut: '05:30 PM',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    date: '2023-11-29',
    status: 'Absent',
    timeIn: '-',
    timeOut: '-',
  },
  {
    id: 4,
    name: 'Diana Ross',
    date: '2023-11-29',
    status: 'Present',
    timeIn: '08:45 AM',
    timeOut: '05:00 PM',
  },
  {
    id: 5,
    name: 'Edward Norton',
    date: '2023-11-29',
    status: 'Early Leave',
    timeIn: '09:00 AM',
    timeOut: '03:30 PM',
  },
];

export function AttendanceTable() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Attendance Records</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Time Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.name}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    record.status === 'Present'
                      ? 'default'
                      : record.status === 'Late'
                        ? 'secondary'
                        : record.status === 'Absent'
                          ? 'destructive'
                          : 'secondary'
                  }
                >
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>{record.timeIn}</TableCell>
              <TableCell>{record.timeOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
