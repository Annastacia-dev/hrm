import { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import UserContext from './contexts/user';
import LoginPage from './components/auth/LogIn';
import DashboardLayout from './components/dashboards/layouts/DashboardLayout';
import Employees from './components/employee/Employees';
import Employee from './components/employee/Employee';
import Attendances from './components/attendance/Attendances';
import AdminDashboard from './components/dashboards/AdminDashboard';
import EmployeeDashboard from './components/dashboards/EmployeeDashboard';
import Error from './components/Error';

function AppContent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

function App() {
  const { currentUser } = useContext(UserContext);

  const rootElement =
    currentUser?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppContent />,
      children: [
        {
          path: '/',
          element: rootElement,
        },
        {
          path: 'employees',
          element: <Employees />,
        },
        {
          path: 'employees/:id',
          element: <Employee />,
        },
        {
          path: 'attendance',
          element: <Attendances />,
        },
        {
          path: '*', // Catch-all for unmatched routes
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <>
      {currentUser ? <RouterProvider router={router} /> : <LoginPage />}
      <Toaster />
    </>
  );
}

export default App;
