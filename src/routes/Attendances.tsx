import UserContext from '@/contexts/user';
import { useContext } from 'react';
import AdminAttendances from '../components/admin/attendance/AdminAttendances';
import UserAttendanceHistory from '@/components/employee/attendance/EmployeeAttendanceHistory';

const Attendances = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      {currentUser?.role === 'admin' ? (
        <AdminAttendances />
      ) : (
        <UserAttendanceHistory />
      )}
    </div>
  );
};

export default Attendances;
