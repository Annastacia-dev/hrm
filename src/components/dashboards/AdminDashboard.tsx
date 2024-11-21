import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { UserPlus, Users, FileText, Calendar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const employeeData = [
  { department: 'Engineering', count: 50 },
  { department: 'Marketing', count: 30 },
  { department: 'Sales', count: 40 },
  { department: 'HR', count: 15 },
  { department: 'Finance', count: 20 },
];

const recentActivities = [
  {
    id: 1,
    activity: 'New employee onboarding',
    date: '2023-04-01',
    status: 'Completed',
  },
  {
    id: 2,
    activity: 'Performance review',
    date: '2023-04-03',
    status: 'In Progress',
  },
  {
    id: 3,
    activity: 'Training session',
    date: '2023-04-05',
    status: 'Scheduled',
  },
  {
    id: 4,
    activity: 'Leave request approval',
    date: '2023-04-02',
    status: 'Pending',
  },
];

export default function HRMDashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Positions
              </CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                4 filled this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Reviews
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next 7 days</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6 overflow-x-scroll">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Employee Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: 'Employee Count',
                    color: 'hsl(var(--chart-1))',
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={employeeData}>
                    <XAxis dataKey="department" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="count"
                      fill="var(--color-count)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest HR activities and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>{activity.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
