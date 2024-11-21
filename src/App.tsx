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
import Error from './components/Error';

function AppContent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContent />,
    children: [
      {
        path: '/', // Root path renders AdminDashboard
        element: <AdminDashboard />,
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

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser ? <RouterProvider router={router} /> : <LoginPage />}
      <Toaster />
    </>
  );
}

export default App;
