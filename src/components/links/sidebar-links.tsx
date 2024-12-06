import { useContext } from 'react';
import UserContext from '@/contexts/user';
import { SidebarItemProps } from '@/interfaces/sidebar-items';
import {
  Home,
  Users,
  Clock,
  ChartNoAxesCombined,
  CircleGauge,
  BookCheck,
} from 'lucide-react';

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
    },
    {
      icon: <CircleGauge size={18} />,
      text: 'Performance',
      link: '/performance',
    },
    {
      icon: <BookCheck size={18} />,
      text: 'Training & Development',
      link: '/training-and-development',
    },
    {
      icon: <ChartNoAxesCombined size={18} />,
      text: 'Reporting & Analytics',
      link: '/reporting-and-analytics',
    },
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
      : currentUser?.role.toLowerCase() === 'hr manager'
        ? [...commonLinks, ...managerLinks]
        : currentUser?.role.toLowerCase() === 'finance'
          ? [...commonLinks, ...financeLinks]
          : currentUser?.role.toLowerCase() === 'employee'
            ? [...commonLinks, ...employeeLinks]
            : [...commonLinks];

  return items;
};

export default SidebarLinks;
