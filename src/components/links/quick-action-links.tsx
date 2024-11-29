import { useContext } from 'react';
import UserContext from '@/contexts/user';
import { QuickActionItemProps } from '@/interfaces/quick-action-item';
import { PlusIcon, FileText, Calendar } from 'lucide-react';
import NewEmployee from '@/components/employee/employment/NewEmployeeDrawer';

const QuickActionLinks = () => {
  const { currentUser } = useContext(UserContext);

  const commonLinks: QuickActionItemProps[] = [];

  const adminLinks: QuickActionItemProps[] = [];

  const managerLinks: QuickActionItemProps[] = [
    {
      label: 'Add Employee',
      icon: <PlusIcon />,
      drawerContent: <NewEmployee />,
    },
    {
      label: 'Generate Report',
      icon: <FileText />,
      drawerContent: '',
    },
    {
      label: 'Schedule a Review',
      icon: <Calendar />,
      drawerContent: '',
    },
  ];

  const financeLinks: QuickActionItemProps[] = [];

  const employeeLinks: QuickActionItemProps[] = [];

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

export default QuickActionLinks;
