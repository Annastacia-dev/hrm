import EditEmployeeForm from './EditEmployeeForm';

import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Employee } from '@/types/employee';

type Props = {
  employee: Employee;
};

const EditEmployeeDrawer = ({ employee }: Props) => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <DrawerHeader>
        <DrawerTitle>
          Edit {employee.first_name} {employee.last_name} Details
        </DrawerTitle>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <EditEmployeeForm employee={employee} />
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
};

export default EditEmployeeDrawer;
