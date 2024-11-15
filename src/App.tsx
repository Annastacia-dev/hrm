import LoginPage from './components/auth/LogIn';
import DashboardLayout from './components/dashboards/layouts/DashboardLayout';
import UserContext from './contexts/user';
import { useContext } from 'react';
import { Toaster } from './components/ui/toaster';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Employees from './components/employee/Employees';
import Employee from './components/employee/Employee';
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
        path: 'employees',
        element: <Employees />,
      },
      {
        path: 'employees/:id',
        element: <Employee />,
      },
      {
        path: '*',
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
