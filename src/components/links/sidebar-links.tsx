import { useContext } from 'react';
import UserContext from '@/contexts/user';
import { SidebarItemProps } from '@/interfaces/sidebar-items';
import { Home, Users, Clock } from 'lucide-react';

const SidebarLinks = () => {
  const { currentUser } = useContext(UserContext);

  const commonLinks = [
    {
      icon: <Home size={18} />,
      text: 'Home',
      link: '/',
    },
    {
      icon: <Clock size={18} />,
      text: 'Attendance',
      link: '/attendance',
    }
  ];

  const adminLinks: SidebarItemProps[] = [];

  const managerLinks: SidebarItemProps[] = [
    {
      icon: <Users size={18} />,
      text: 'Employees',
      link: '/employees',
    },
  ];

  const financeLinks: SidebarItemProps[] = [];

  const employeeLinks: SidebarItemProps[] = [];

  const items =
    currentUser?.role === 'admin'
      ? [...commonLinks, ...adminLinks, ...managerLinks, ...financeLinks]
      : currentUser?.role === 'manager'
        ? [...commonLinks, ...managerLinks]
        : currentUser?.role === 'finance'
          ? [...commonLinks, ...financeLinks]
          : currentUser?.role === 'employee'
            ? [...commonLinks, ...employeeLinks]
            : [...commonLinks];

  return items;
};

export default SidebarLinks;
