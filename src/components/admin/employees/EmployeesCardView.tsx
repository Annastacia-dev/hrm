import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Mail,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
  ShieldMinus,
  ShieldCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditEmployeeDrawer from '@/components/employee/employment/EditEmployeeDrawer';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
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

type EmployeesCardViewProps = {
  employeeList: User[];
  openEditDrawer: string | null;
  setOpenEditDrawer: (_id: string | null) => void;
  handleDelete: (_id: string | null) => void;
  handleInactivate: (_id: string | null) => void;
  handleActivate: (_id: string | null) => void;
};

const EmployeesCardView = ({
  employeeList,
  openEditDrawer,
  setOpenEditDrawer,
  handleDelete,
  handleActivate,
  handleInactivate,
}: EmployeesCardViewProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employeeList.map((employee) => (
        <Card
          key={employee.id_number}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link to={`/employees/${employee.id_number}`}>
            <CardHeader className="border-b bg-muted/20 p-4">
              <div className="flex items-center justify-between">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={employee.profile_picture}
                    alt={`${employee.first_name} ${employee.last_name}`}
                  />
                  <AvatarFallback className="text-lg">
                    {employee.first_name[0]}
                    {employee.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <EmployeeActions
                  employee={employee}
                  openEditDrawer={openEditDrawer}
                  setOpenEditDrawer={setOpenEditDrawer}
                  handleDelete={handleDelete}
                  handleActivate={handleActivate}
                  handleInactivate={handleInactivate}
                />
              </div>
              <CardTitle className="mt-4 text-lg font-semibold flex items-center gap-2">
                {employee.first_name} {employee.last_name}
                <p
                  className={`h-2 w-2 ${employee.active ? 'bg-green-300' : 'bg-gray-500'} rounded-full`}
                ></p>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {employee.job_title} - {employee.department}
              </div>
            </CardHeader>
          </Link>
          <CardContent className="p-4">
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">
                  {employee.role}
                </Badge>
                <span className="text-muted-foreground">
                  {employee.employment_status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Hired: {new Date(employee.date_of_joining).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${employee.email}`}
                  className="text-sm hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {employee.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`tel:${employee.phone_number}`}
                  className="text-sm hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {employee.phone_number}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

type EmployeeActionsProps = {
  employee: User;
  openEditDrawer: string | null;
  setOpenEditDrawer: (_id: string | null) => void;
  handleDelete: (_id: string | null) => void;
  handleInactivate: (_id: string | null) => void;
  handleActivate: (_id: string | null) => void;
};

const EmployeeActions = ({
  employee,
  openEditDrawer,
  setOpenEditDrawer,
  handleDelete,
  handleActivate,
  handleInactivate,
}: EmployeeActionsProps) => {
  return (
    <div onClick={(e) => e.preventDefault()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link to={`/employees/${employee.id_number}`}>
              <Eye className="mr-2 h-4 w-4" />
              <span>View</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setOpenEditDrawer(employee.id_number)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          {employee.active ? (
            <DropdownMenuItem
              onSelect={() => handleInactivate(employee.id_number)}
            >
              <ShieldMinus className="mr-2 h-4 w-4" />
              <span>Inactivate</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => handleActivate(employee.id_number)}
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>Activate</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <AlertDialog>
              <AlertDialogTrigger className="flex w-full items-center px-2 py-1.5 text-sm text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                </AlertDialogHeader>
                <p>
                  This action is permanent and will delete all of{' '}
                  {employee.first_name}&apos;s details from the system.
                </p>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(employee.id_number)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Drawer
        open={openEditDrawer === employee.id_number}
        onOpenChange={(open) =>
          setOpenEditDrawer(open ? employee.id_number : null)
        }
      >
        <DrawerContent>
          <EditEmployeeDrawer user={employee} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EmployeesCardView;
