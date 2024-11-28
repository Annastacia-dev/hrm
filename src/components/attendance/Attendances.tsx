import UserContext from '@/contexts/user';
import { useContext } from 'react';
import AdminAttendances from './AdminAttendances';
import UserAttendanceHistory from './UserAttendanceHistory';

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
