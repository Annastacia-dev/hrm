'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const data = [
  { date: '11/23', attendance: 92 },
  { date: '11/24', attendance: 94 },
  { date: '11/25', attendance: 96 },
  { date: '11/26', attendance: 95 },
  { date: '11/27', attendance: 93 },
  { date: '11/28', attendance: 97 },
  { date: '11/29', attendance: 91 },
];

export function AttendanceTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trend (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            attendance: {
              label: 'Attendance Rate',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis domain={[85, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="var(--color-attendance)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
