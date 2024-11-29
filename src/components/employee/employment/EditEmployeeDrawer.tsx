import EditEmployeeForm from './EditEmployeeForm';

import { Button } from '@/components/ui/button';
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { User } from '@/types/user';

type Props = {
  user: User;
};

const EditEmployeeDrawer = ({ user }: Props) => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <DrawerHeader>
        <DrawerTitle>
          Edit {user.first_name} {user.last_name} Details
        </DrawerTitle>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <EditEmployeeForm user={user} />
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
