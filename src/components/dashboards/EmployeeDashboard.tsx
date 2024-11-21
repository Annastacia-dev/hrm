import { useState } from 'react';
import { users } from '@/data/users';
import { Card, CardContent } from '../ui/card';
import { Table, TableRow, TableBody, TableCell } from '../ui/table';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { User } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

const DailyAttendanceCheckIn = () => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [timePickerAction, setTimePickerAction] = useState<
    'checkIn' | 'checkOut'
  >('checkIn');
  const [timePickerUser, setTimePickerUser] = useState<User | null>(null);
  const [timePickerTime, setTimePickerTime] = useState<string>(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const { toast } = useToast();

  const openTimePicker = (user: User, action: 'checkIn' | 'checkOut') => {
    setIsTimePickerOpen(true);
    setTimePickerAction(action);
    setTimePickerUser(user);
  };

  const closeTimePicker = () => {
    setIsTimePickerOpen(false);
  };

  const handleCheckIn = (date: string) => {
    if (timePickerTime) {
      timePickerUser?.attendances?.push({
        date,
        clock_in_time: timePickerTime,
      });

      toast({
        title: 'Check in successful',
      });

      closeTimePicker();
    }
  };

  const handleCheckOut = (date: string) => {
    const attendance = timePickerUser?.attendances?.find(
      (attendance) => attendance.date === date
    );

    if (attendance) {
      attendance.clock_out_time = timePickerTime;
    }

    toast({
      title: 'Check out successful',
    });

    closeTimePicker();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="uppercase font-semibold mb-4">
        Daily Attendance Check In ({' '}
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
        )
      </h1>
      <Card>
        <CardContent>
          <Table>
            <thead>
              <TableRow>
                <TableCell className="font-medium">Name</TableCell>
                <TableCell className="font-medium">Check In</TableCell>
                <TableCell className="font-medium">Check Out</TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {users.map((user) => (
                <TableRow className="space-y-2" key={user.id_number}>
                  <TableCell>
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>
                    {user.attendances?.find(
                      (attendance) =>
                        attendance.date ===
                        new Date().toISOString().split('T')[0]
                    ) ? (
                      user.attendances?.find(
                        (attendance) =>
                          attendance.date ===
                          new Date().toISOString().split('T')[0]
                      )?.clock_in_time
                    ) : (
                      <Button onClick={() => openTimePicker(user, 'checkIn')}>
                        Check In
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.attendances?.find(
                      (attendance) =>
                        attendance.date ===
                        new Date().toISOString().split('T')[0]
                    )?.clock_out_time ? (
                      user.attendances?.find(
                        (attendance) =>
                          attendance.date ===
                          new Date().toISOString().split('T')[0]
                      )?.clock_out_time
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => openTimePicker(user, 'checkOut')}
                        disabled={
                          !user.attendances?.find(
                            (attendance) =>
                              attendance.date ===
                                new Date().toISOString().split('T')[0] &&
                              attendance.clock_in_time
                          )
                        }
                      >
                        Check Out
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
              />
            </DialogDescription>
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailyAttendanceCheckIn;
