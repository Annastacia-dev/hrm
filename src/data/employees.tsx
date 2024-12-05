import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Employee } from '@/types/employee';

const useEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Add error handling
  useEffect(() => {
    api.get('/employees').then((response) => {
      if (response.status === 200) {
        setEmployees(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
        setError(response.data.detail);
      }
    });
  }, []);

  console.log(employees, error);

  return { employees, setEmployees, loading };
};

export default useEmployees;
