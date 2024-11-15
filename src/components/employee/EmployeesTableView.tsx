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
import EditEmployeeDrawer from './EditEmployeeDrawer';
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

import { User } from '@/types/user';

type EmployeesTableViewProps = {
  employeeList: User[];
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
              <TableHead className="">Name</TableHead>
              <TableHead>Job Title / Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Employment Status</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeeList.map((employee) => (
              <TableRow key={employee.id_number}>
                <TableCell>
                  <Link
                    to={`/employees/${employee.id_number}`}
                    className="hover:underline hover:text-primaryPink transition-all duration-300"
                  >
                    {employee.first_name} {employee.last_name}
                  </Link>
                </TableCell>
                <TableCell className="capitalize flex flex-col space-y-1">
                  <span>{employee.job_title}</span>
                  <span className="text-sm text-muted-foreground">
                    {employee.department}
                  </span>
                </TableCell>
                <TableCell className="capitalize">{employee.role}</TableCell>
                <TableCell className="capitalize">
                  {employee.employment_status}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <span>{employee.phone_number}</span>
                    <span>{employee.email}</span>
                  </div>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link to={`/employees/${employee.id_number}`}>
                    <Button variant="ghost" size="icon" title="View">
                      <Eye />
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
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent onClick={(e) => e.stopPropagation()}>
                      <EditEmployeeDrawer user={employee} />
                    </DrawerContent>
                  </Drawer>
                  {employee.active ? (
                    <Button
                      variant="ghost"
                      title="inactivate"
                      onClick={() => handleInactivate(employee.id_number)}
                    >
                      <ShieldMinus />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      title="inactivate"
                      onClick={() => handleActivate(employee.id_number)}
                    >
                      <ShieldCheck />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        className="text-red-500"
                      >
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          This action is permanent and will delete all{' '}
                          {employee.first_name}&apos;s details from the system
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleDelete(employee.id_number)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeesTableView;
