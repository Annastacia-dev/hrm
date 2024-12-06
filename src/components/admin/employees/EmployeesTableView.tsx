import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Pencil, Eye, Trash2, ShieldMinus, ShieldCheck } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types/employee';
import EditEmployeeDrawer from '@/components/employee/employment/EditEmployeeDrawer';

type EmployeesTableViewProps = {
  employeeList: Employee[];
  openEditDrawer: string | null;
  setOpenEditDrawer: (_id: string | null) => void;
  handleDelete: (_id: string | null) => void;
  handleInactivate: (_id: string | null) => void;
  handleActivate: (_id: string | null) => void;
};

const EmployeesTableView = ({
  employeeList,
  openEditDrawer,
  setOpenEditDrawer,
  handleDelete,
  handleInactivate,
  handleActivate,
}: EmployeesTableViewProps) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Title / Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Employment Status</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeList.map((employee) => (
              <TableRow key={employee.id_number}>
                <TableCell>
                  <Link
                    to={`/employees/${employee.id_number}`}
                    className="hover:underline hover:text-primary transition-colors duration-200"
                  >
                    <span className="capitalize">
                      {employee.first_name} {employee.last_name}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col capitalize">
                    <span className="font-medium">{employee.job_role}</span>
                    <span className="text-sm text-muted-foreground">
                      {employee.department_name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{employee.role}</TableCell>
                <TableCell className="">
                  <Badge className="text-white">
                    {employee.employment_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{employee.phone}</span>
                    <span className="text-sm text-muted-foreground">
                      {employee.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ActionButtons
                      employee={employee}
                      openEditDrawer={openEditDrawer}
                      setOpenEditDrawer={setOpenEditDrawer}
                      handleDelete={handleDelete}
                      handleInactivate={handleInactivate}
                      handleActivate={handleActivate}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

type ActionButtonsProps = {
  employee: Employee;
  openEditDrawer: string | null;
  setOpenEditDrawer: (_id: string | null) => void;
  handleDelete: (_id: string | null) => void;
  handleInactivate: (_id: string | null) => void;
  handleActivate: (_id: string | null) => void;
};

const ActionButtons = ({
  employee,
  openEditDrawer,
  setOpenEditDrawer,
  handleDelete,
  handleInactivate,
  handleActivate,
}: ActionButtonsProps) => (
  <>
    <Link to={`/employees/${employee.id_number}`}>
      <Button variant="ghost" size="icon" title="View">
        <Eye className="h-4 w-4" />
      </Button>
    </Link>
    <Drawer
      open={openEditDrawer === employee.id_number}
      onOpenChange={(open) =>
        setOpenEditDrawer(open ? employee.id_number : null)
      }
    >
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" title="Edit">
          <Pencil className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent onClick={(e) => e.stopPropagation()}>
        <EditEmployeeDrawer employee={employee} />
      </DrawerContent>
    </Drawer>
    {employee.active ? (
      <Button
        variant="ghost"
        size="icon"
        title="Inactivate"
        onClick={() => handleInactivate(employee.id_number)}
      >
        <ShieldMinus className="h-4 w-4" />
      </Button>
    ) : (
      <Button
        variant="ghost"
        size="icon"
        title="Activate"
        onClick={() => handleActivate(employee.id_number)}
      >
        <ShieldCheck className="h-4 w-4" />
      </Button>
    )}
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Delete"
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            This action is permanent and will delete all {employee.first_name}
            &apos;s details from the system
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => handleDelete(employee.id_number)}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
);

export default EmployeesTableView;
