import { users } from '@/data/users';
import { Button } from '@/components/ui/button';
import BreadcrumbComponent from '@/components/BreadcrumbComponent';
import { useContext, useState } from 'react';
import UserContext from '@/contexts/user';
import { IdCard, Grid3x3, Plus } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import NewEmployeeDrawer from './NewEmployeeDrawer';
import { toast } from '@/hooks/use-toast';
import EmployeesTableView from './EmployeesTableView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeesCardView from './EmployeesCardView';

const Employees = () => {
  const { currentUser } = useContext(UserContext);
  const [view, setView] = useState<'table' | 'card'>(
    () => (localStorage.getItem('employeesView') as 'table' | 'card') || 'card'
  );
  const [openEditDrawer, setOpenEditDrawer] = useState<string | null>(null);
  const [employeeList, setEmployeeList] = useState(
    currentUser?.role === 'admin'
      ? users
      : currentUser?.role === 'manager'
        ? users.filter((user) => user.role != 'manager' && user.role != 'admin')
        : []
  );

  const toggleView = () => {
    const newView = view === 'table' ? 'card' : 'table';
    setView(newView);
    localStorage.setItem('employeesView', newView);
  };

  const handleDelete = (idNumber: string | null) => {
    if (!idNumber) return;
    const employee = employeeList.find((e) => e.id_number === idNumber);
    if (!employee) return;

    setEmployeeList((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id_number !== idNumber)
    );
    toast({
      title: `${employee.first_name} ${employee.last_name} deleted`,
      description: `Employee has been deleted successfully`,
    });
  };

  const activeEmployees = employeeList.filter((employee) => employee.active);
  const inactiveEmployees = employeeList.filter((employee) => !employee.active);

  const handleInactivate = (idNumber: string | null) => {
    if (!idNumber) return;
    const employee = employeeList.find((e) => e.id_number === idNumber);
    if (!employee) return;
    employee.active = false;
    setEmployeeList([...employeeList]);
    toast({
      title: `${employee.first_name} ${employee.last_name} inactivated`,
      description: `Employee has been inactivated successfully`,
    });
  };

  const handleActivate = (idNumber: string | null) => {
    if (!idNumber) return;
    const employee = employeeList.find((e) => e.id_number === idNumber);
    if (!employee) return;
    employee.active = true;
    setEmployeeList([...employeeList]);
    toast({
      title: `${employee.first_name} ${employee.last_name} activated`,
      description: `Employee has been activated successfully`,
    });
  };

  return (
    <div className="flex flex-col gap-6 text-sm overflow-hidden">
      <BreadcrumbComponent
        items={[
          { name: 'Home', href: '/' },
          { name: 'Employees', href: '/employees' },
        ]}
      />

      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between gap-4">
        <h5 className="font-bold text-lg capitalize text-primaryPink">
          Employees({employeeList.length})
        </h5>
        <div className="flex items-center gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">
                <Plus />
                <span>New Employee</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <NewEmployeeDrawer />
            </DrawerContent>
          </Drawer>
          <Button variant="outline" size="lg" onClick={toggleView}>
            {view === 'table' ? <IdCard size={24} /> : <Grid3x3 size={24} />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            Active({activeEmployees.length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive({inactiveEmployees.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {view === 'table' ? (
            <EmployeesTableView
              employeeList={activeEmployees}
              openEditDrawer={openEditDrawer}
              setOpenEditDrawer={setOpenEditDrawer}
              handleDelete={handleDelete}
              handleInactivate={handleInactivate}
              handleActivate={handleActivate}
            />
          ) : (
            <EmployeesCardView
              employeeList={activeEmployees}
              openEditDrawer={openEditDrawer}
              setOpenEditDrawer={setOpenEditDrawer}
              handleDelete={handleDelete}
              handleInactivate={handleInactivate}
              handleActivate={handleActivate}
            />
          )}
        </TabsContent>
        <TabsContent value="inactive">
          {view === 'table' ? (
            <EmployeesTableView
              employeeList={inactiveEmployees}
              openEditDrawer={openEditDrawer}
              setOpenEditDrawer={setOpenEditDrawer}
              handleDelete={handleDelete}
              handleInactivate={handleInactivate}
              handleActivate={handleActivate}
            />
          ) : (
            <EmployeesCardView
              employeeList={inactiveEmployees}
              openEditDrawer={openEditDrawer}
              setOpenEditDrawer={setOpenEditDrawer}
              handleDelete={handleDelete}
              handleInactivate={handleInactivate}
              handleActivate={handleActivate}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Employees;
