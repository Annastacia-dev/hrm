import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Phone,
  Send,
  Ellipsis,
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
import EditEmployeeDrawer from './EditEmployeeDrawer';
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
    <div className="grid lg:grid-cols-3 gap-4">
      {employeeList.map((employee) => (
        <Link to={`/employees/${employee.id_number}`} key={employee.id_number}>
          <Card
            key={employee.id_number}
            className="hover:scale-105 transition-all duration-300"
          >
            <CardContent className="space-y-4 p-4">
              <div className="flex justify-between items-center gap-2">
                <Avatar>
                  <AvatarImage src={employee.profile_picture} />
                  <AvatarFallback>
                    {employee.first_name[0]}
                    {employee.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link to={`/employees/${employee.id_number}`}>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          setOpenEditDrawer(employee.id_number);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </div>
                      </DropdownMenuItem>
                      {employee.active ? (
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleInactivate(employee.id_number);
                          }}
                        >
                          <ShieldMinus className="w-4 h-4" />
                          <span>Inactivate</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                            handleActivate(employee.id_number);
                          }}
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Activate</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <div className="flex items-center gap-2 text-red-500">
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </div>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                This action is permanent and will delete all{' '}
                                {employee.first_name}&apos;s details from the
                                system
                              </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(employee.id_number);
                                }}
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Drawer
                  open={openEditDrawer === employee.id_number}
                  onOpenChange={(open) =>
                    setOpenEditDrawer(open ? employee.id_number : null)
                  }
                >
                  <DrawerContent onClick={(e) => e.stopPropagation()}>
                    <EditEmployeeDrawer user={employee} />
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span>
                    {employee.first_name} {employee.last_name}
                  </span>
                  <span className="capitalize text-sm text-gray-500">
                    {employee.job_title} - {employee.department}
                  </span>
                  <span className="capitalize text-sm text-gray-500">
                    {employee.role}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <p className="flex flex-col gap-1 capitalize">
                    <span className="text-sm text-gray-500">
                      Employment Status
                    </span>
                    <span>{employee.employment_status}</span>
                  </p>
                  <p className="flex flex-col gap-1">
                    <span className="capitalize text-sm text-gray-500">
                      Date Hired
                    </span>
                    <span>
                      {new Date(employee.date_of_joining).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:gap-2 gap-3 mt-4  ">
                    <a
                      href={`mailto:${employee.email}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 lg:ml-0 ml-16"
                    >
                      <Send className="w-4 h-4" />
                      <span>{employee.email}</span>
                    </a>
                    <a
                      href={`tel:${employee.phone_number}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      rel="noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone_number}</span>
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default EmployeesCardView;
