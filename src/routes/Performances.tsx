import UserContext from '@/contexts/user';
import { useContext } from 'react';
import EmployeesPerformance from '@/components/admin/performances/EmployeesPerformance';
import EmployeePerformance from '@/components/employee/performance/EmployeePerformance';

const Attendances = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      {currentUser?.role === 'admin' ? (
        <EmployeesPerformance />
      ) : (
        <EmployeePerformance />
      )}
    </div>
  );
};

export default Attendances;
