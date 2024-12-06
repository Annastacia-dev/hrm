import { useState, useContext, useCallback, useEffect } from 'react';
import { Plus, Search, Grid3x3, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { toast } from '@/hooks/use-toast';
import { users } from '@/data/users';
import UserContext from '@/contexts/user';
import NewEmployeeDrawer from '../../employee/employment/NewEmployeeDrawer';
import EmployeesTableView from './EmployeesTableView';
import EmployeesCardView from './EmployeesCardView';
import { useNavigate } from 'react-router-dom';
import useEmployees from '@/data/employees';

export default function EmployeesComponent() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const role = currentUser?.role.toLowerCase();
    if (role !== 'admin' && role !== 'hr manager') {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You are not authorized to access this page'
      });
      navigate(-1);
      navigate('/');
    }
  }, [currentUser, navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [view, setView] = useState<'table' | 'card'>(
    () => (localStorage.getItem('employeesView') as 'table' | 'card') || 'card'
  );
  const [openEditDrawer, setOpenEditDrawer] = useState<string | null>(null);

  const { employees, setEmployees, loading } = useEmployees();

  console.log(employees);

  const [employeeList, setEmployeeList] = useState(
    currentUser?.role === 'admin'
      ? employees
      : currentUser?.role.toLowerCase() === 'hr manager'
        ? employees.filter(
            (employee) => employee.role !== 'hr manager' && employee.role !== 'admin'
          )
        : []
  );

  const toggleView = useCallback(() => {
    const newView = view === 'table' ? 'card' : 'table';
    setView(newView);
    localStorage.setItem('employeesView', newView);
  }, [view]);

  const handleDelete = useCallback(
    (idNumber: string | null) => {
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
    },
    [employeeList]
  );

  const handleInactivate = useCallback(
    (idNumber: string | null) => {
      if (!idNumber) return;
      const employee = employeeList.find((e) => e.id_number === idNumber);
      if (!employee) return;
      employee.active = false;
      setEmployeeList([...employeeList]);
      toast({
        title: `${employee.first_name} ${employee.last_name} inactivated`,
        description: `Employee has been inactivated successfully`,
      });
    },
    [employeeList]
  );

  const handleActivate = useCallback(
    (idNumber: string | null) => {
      if (!idNumber) return;
      const employee = employeeList.find((e) => e.id_number === idNumber);
      if (!employee) return;
      employee.active = true;
      setEmployeeList([...employeeList]);
      toast({
        title: `${employee.first_name} ${employee.last_name} activated`,
        description: `Employee has been activated successfully`,
      });
    },
    [employeeList]
  );

  const filteredEmployees = employeeList.filter(
    (employee) =>
      (
        employee.first_name.toLowerCase() +
        ' ' +
        employee.last_name.toLowerCase()
      ).includes(searchQuery.toLowerCase()) &&
      (departmentFilter === '' || employee.department === departmentFilter)
  );

  const activeEmployees = filteredEmployees
  .filter(
    (employee) => employee.active
  );
  const inactiveEmployees = filteredEmployees.filter(
    (employee) => !employee.active
  );

  console.log(employeeList);


  return (
    <Card>
      <CardHeader className="flex lg:flex-row flex-col lg:items-center justify-between lg:space-y-0 space-y-4  pb-2">
        <CardTitle>Employees</CardTitle>
        <div className="flex items-center space-x-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                New Employee
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <NewEmployeeDrawer />
            </DrawerContent>
          </Drawer>
          <Button variant="outline" size="icon" onClick={toggleView}>
            {view === 'table' ? (
              <Grid3x3 className="h-4 w-4" />
            ) : (
              <LayoutList className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees"
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active ({employees.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({filteredEmployees.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {view === 'table' ? (
              <EmployeesTableView
                employeeList={employees}
                openEditDrawer={openEditDrawer}
                setOpenEditDrawer={setOpenEditDrawer}
                handleDelete={handleDelete}
                handleInactivate={handleInactivate}
                handleActivate={handleActivate}
              />
            ) : (
              <EmployeesCardView
                employeeList={employees}
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
      </CardContent>
    </Card>
  );
}
