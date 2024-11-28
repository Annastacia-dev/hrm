import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const mockAttendanceData = [
  { month: 'Jan', present: 20, late: 2, absent: 1 },
  { month: 'Feb', present: 18, late: 3, absent: 2 },
  { month: 'Mar', present: 22, late: 1, absent: 0 },
  { month: 'Apr', present: 20, late: 2, absent: 1 },
  { month: 'May', present: 21, late: 1, absent: 1 },
];

export function AttendanceGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockAttendanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="present" stackId="a" fill="#4ade80" />
            <Bar dataKey="late" stackId="a" fill="#fbbf24" />
            <Bar dataKey="absent" stackId="a" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
