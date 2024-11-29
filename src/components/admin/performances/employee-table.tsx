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

const employees = [
  {
    id: 1,
    name: 'Alice Johnson',
    department: 'Sales',
    performance: 92,
    status: 'Top Performer',
  },
  {
    id: 2,
    name: 'Bob Smith',
    department: 'Marketing',
    performance: 78,
    status: 'Good',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    department: 'Engineering',
    performance: 85,
    status: 'Good',
  },
  {
    id: 4,
    name: 'Diana Ross',
    department: 'HR',
    performance: 95,
    status: 'Top Performer',
  },
  {
    id: 5,
    name: 'Edward Norton',
    department: 'Sales',
    performance: 68,
    status: 'Needs Improvement',
  },
];

export function EmployeeTable() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee Performance</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Performance Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.performance}%</TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === 'Top Performer'
                      ? 'default'
                      : employee.status === 'Good'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
