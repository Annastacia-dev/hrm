import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface LeaveRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 5, 5),
    status: 'approved',
  },
  {
    id: 2,
    startDate: new Date(2024, 6, 15),
    endDate: new Date(2024, 6, 16),
    status: 'pending',
  },
];

export function LeaveRequests() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {mockLeaveRequests.map((request) => (
          <div key={request.id} className="mb-2">
            <p>
              {format(request.startDate, 'MMM d')} -{' '}
              {format(request.endDate, 'MMM d, yyyy')}
            </p>
            <Badge
              variant={
                request.status === 'approved'
                  ? 'default'
                  : request.status === 'rejected'
                    ? 'destructive'
                    : 'secondary'
              }
            >
              {request.status}
            </Badge>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Request Leave</Button>
      </CardFooter>
    </Card>
  );
}
