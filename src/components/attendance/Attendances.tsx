import BreadcrumbComponent from '../BreadcrumbComponent';
import UserContext from '@/contexts/user';
import { useContext } from 'react';
import DailyAttendanceCheckIn from './DailyAttendanceCheckIn';

const Attendances = () => {
  const { currentUser } = useContext(UserContext);

  console.log(currentUser?.role === 'admin');

  return (
    <div className="">
      <BreadcrumbComponent
        items={[
          { name: 'Home', href: '/' },
          { name: 'Attendances', href: '/attendances' },
        ]}
      />
      <div className="flex flex-col gap-4 mt-4">
        {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
          <DailyAttendanceCheckIn />
        )}
      </div>
    </div>
  );
};

export default Attendances;
