import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Department } from '@/types/department';

const useDepartments = () => {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Add error handling
  useEffect(() => {
    api.get('/departments').then((response) => {
      if (response.status === 200) {
        setDepartments(response.data.departments);
        setLoading(false);
      } else {
        setLoading(false);
        setError(response.data.detail);
        console.error(error);
      }
    });
  }, [error]);

  return { departments, loading };
};

export default useDepartments;
