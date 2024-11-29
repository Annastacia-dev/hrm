import { useState, useContext } from 'react';
import UserContext from '@/contexts/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  CalendarDays,
  ClipboardList,
  TrendingUp,
  FileText,
  UserCog,
} from 'lucide-react';

export default function EmployeeDashboard() {
  const { currentUser } = useContext(UserContext);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [timePickerAction, setTimePickerAction] = useState<
    'checkIn' | 'checkOut'
  >('checkIn');
  const [timePickerTime, setTimePickerTime] = useState<string>(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const openTimePicker = (action: 'checkIn' | 'checkOut') => {
    setIsTimePickerOpen(true);
    setTimePickerAction(action);
  };

  const closeTimePicker = () => {
    setIsTimePickerOpen(false);
  };

  const handleCheckIn = (date: string) => {
    if (timePickerTime) {
      // TODO: Implement actual check-in logic
      console.log(`Checked in at ${timePickerTime} on ${date}`);
      closeTimePicker();
    }
  };

  const handleCheckOut = (date: string) => {
    if (timePickerTime) {
      // TODO: Implement actual check-out logic
      console.log(`Checked out at ${timePickerTime} on ${date}`);
      closeTimePicker();
    }
  };

  const handleLeaveRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement actual leave request submission
    console.log('Leave request submitted');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = currentUser?.attendances?.find(
    (attendance) => attendance.date === today
  );

  return (
    <div className="space-y-6 p-6 bg-background">
      <h1 className="text-3xl font-bold">
        Welcome, {currentUser?.first_name}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <p>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <div className="space-x-2">
                {!todayAttendance?.checkIn ? (
                  <Button onClick={() => openTimePicker('checkIn')}>
                    Check In
                  </Button>
                ) : (
                  <span>
                    Checked in at: {formatTime(todayAttendance.checkIn as Date)}
                  </span>
                )}
                {todayAttendance?.checkIn && !todayAttendance?.checkOut && (
                  <Button
                    variant="secondary"
                    onClick={() => openTimePicker('checkOut')}
                  >
                    Check Out
                  </Button>
                )}
                {todayAttendance?.checkOut && (
                  <span>
                    Checked out at:{' '}
                    {formatTime(todayAttendance.checkOut as Date)}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Drawer>
              <DrawerTrigger asChild>
                <Button>Request Leave</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Submit Leave Request</DrawerTitle>
                  <DrawerDescription>
                    Fill out the form to submit a leave request.
                  </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleLeaveRequest} className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="leave-type">Leave Type</Label>
                    <select
                      id="leave-type"
                      className="w-full p-2 border rounded"
                    >
                      <option>Annual Leave</option>
                      <option>Sick Leave</option>
                      <option>Personal Leave</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input type="date" id="start-date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input type="date" id="end-date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe the reason for your leave request"
                      required
                    />
                  </div>
                  <DrawerFooter>
                    <Button type="submit">Submit Request</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </DrawerContent>
            </Drawer>
            {currentUser?.recentLeaveRequest && (
              <div className="mt-4">
                <h3 className="font-semibold">Recent Leave Request</h3>
                <p>Type: {currentUser.recentLeaveRequest.type}</p>
                <p>Status: {currentUser.recentLeaveRequest.status}</p>
                <p>
                  Dates: {currentUser.recentLeaveRequest.startDate} -{' '}
                  {currentUser.recentLeaveRequest.endDate}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <TrendingUp className="mr-2" />
                <span>Productivity: 95% (Top 10% of team)</span>
              </li>
              <li className="flex items-center">
                <ClipboardList className="mr-2" />
                <span>Tasks Completed: 37 (This month)</span>
              </li>
              <li className="flex items-center">
                <CalendarDays className="mr-2" />
                <span>Attendance Rate: 98%</span>
              </li>
            </ul>
            <Button className="mt-4" variant="outline" asChild>
              <a href="/performance">View Full Report</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20" asChild>
                <a href="/payslips">
                  <FileText className="mr-2" />
                  Access Payslips
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a href="/profile">
                  <UserCog className="mr-2" />
                  Update Personal Info
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a href="/attendance">
                  <CalendarDays className="mr-2" />
                  Attendance Report
                </a>
              </Button>
              <Button variant="outline" className="h-20" asChild>
                <a href="/training">
                  <ClipboardList className="mr-2" />
                  Training Modules
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {timePickerAction === 'checkIn' ? 'Check In' : 'Check Out'}
            </DialogTitle>
            <DialogDescription>
              {timePickerAction === 'checkIn'
                ? 'Please select the time you checked in'
                : 'Please select the time you checked out'}
              <Input
                type="time"
                value={timePickerTime}
                onChange={(e) => setTimePickerTime(e.target.value)}
                className="mt-2"
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" onClick={closeTimePicker}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="default"
              onClick={() => {
                if (timePickerAction === 'checkIn') {
                  handleCheckIn(new Date().toISOString().split('T')[0]);
                } else {
                  handleCheckOut(new Date().toISOString().split('T')[0]);
                }
              }}
            >
              {timePickerAction === 'checkIn' ? 'Check In' : 'Check Out'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
