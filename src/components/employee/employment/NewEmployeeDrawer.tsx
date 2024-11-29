import NewEmployeeForm from './NewEmployeeForm';

import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

const NewEmployeeDrawer = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <DrawerHeader>
        <DrawerTitle>Create New Employee</DrawerTitle>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <NewEmployeeForm />
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

export default NewEmployeeDrawer;
