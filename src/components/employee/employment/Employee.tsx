import BreadcrumbComponent from '@/components/BreadcrumbComponent';
import { useParams } from 'react-router-dom';
import useEmployees from '@/data/employees';
import Error from '../../Error';
import { Card, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Pencil,
  Building,
  User,
  IdCard,
} from 'lucide-react';
import EditEmployeeDrawer from './EditEmployeeDrawer';
import { Button } from '../../ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '../../ui/drawer';
import defaultProfile from '@/assets/default-profile.png';
import { Badge } from '@/components/ui/badge';
import { GraduationCap } from 'lucide-react';
import type { Employee } from '@/types/employee';

const Employee = () => {
  const { id } = useParams();
  const { employees } = useEmployees();
  const employee = employees.find(
    (employee: Employee) => employee.id_number === id
  );

  if (!employee) {
    return <Error />;
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const profilePicture = employee.profile_picture
    ? employee.profile_picture
    : defaultProfile;

  const totalSalary = employee.salary_details.reduce(
    (total, salary) => total + salary.base + salary.bonus + salary.stock,
    0
  );

  return (
    <div className="space-y-6 mb-4">
      <BreadcrumbComponent
        items={[
          { name: 'Home', href: '/' },
          { name: 'Employees', href: '/employees' },
          { name: employee?.first_name + ' ' + employee?.last_name, href: '' },
        ]}
      />
      <div className="flex flex-col gap-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3">
          <div className="lg:col-span-1 flex flex-col gap-3">
            <img
              src={profilePicture}
              alt="profile-picture"
              className="rounded-md w-full h-[250px] object-cover object-top"
            />
            <Card>
              <CardHeader>
                <CardTitle>
                  <h1 className="text-lg font-bold">Employment Details</h1>
                </CardTitle>
                <CardDescription className="flex flex-col space-y-2">
                  <p
                    className="text-sm text-gray-500 flex items-center gap-2 mt-3"
                    title="Department"
                  >
                    <Building className="w-4 h-4" />
                    {employee.department_name}
                  </p>
                  <p
                    className="text-sm text-gray-500 flex items-center gap-2"
                    title="Reporting Manager"
                  >
                    <User className="w-4 h-4" />
                    Jenniffer Mateo
                  </p>
                  <p
                    className="text-sm text-gray-500 flex items-center gap-2"
                    title="Employment ID"
                  >
                    <IdCard className="w-4 h-4" />
                    {employee.id_number}
                  </p>
                  <p
                    className="text-sm text-gray-500 flex items-center gap-2"
                    title="Work Location"
                  >
                    <MapPin className="w-4 h-4" />
                    Head Office
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h1 className="text-lg font-bold">Skills</h1>
                  <div className="flex flex-wrap gap-3 mt-5">
                    {employee.skills?.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="grid lg:grid-cols-2 gap-3">
              <Card className="space-y-3 relative">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="absolute top-3 right-4"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <EditEmployeeDrawer employee={employee} />
                  </DrawerContent>
                </Drawer>

                <CardHeader>
                  <CardTitle className="space-y-1 ">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-bold">
                        {employee.first_name} {employee.middle_name}{' '}
                        {employee.last_name}
                      </h1>
                      <p
                        className={`h-2 w-2 ${employee.active ? 'bg-green-300' : 'bg-gray-500'} rounded-full`}
                      ></p>
                    </div>
                    <p className="text-sm text-gray-500 capitalize">
                      {employee.job_role}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {employee.department_name}
                    </p>
                  </CardTitle>
                  <CardDescription className="flex flex-col gap-2 pt-10 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <p className="text-sm text-gray-500">{employee.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <p className="text-sm text-gray-500">{employee.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <p className="text-sm text-gray-500">
                        {calculateAge(employee.date_of_birth)} years old
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <p className="text-sm text-gray-500">
                        {employee.address}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-lg font-bold">Salary Details</h1>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex flex-col  space-y-2 mt-5">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-bold">Base Salary:</span>
                        Kshs. {employee.salary_details[0].base.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-bold">Bonus:</span>
                        Kshs.{employee.salary_details[0].bonus.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-bold">Deduction:</span>
                        Kshs.{employee.salary_details[0].stock.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-bold">Total Salary:</span>
                        Kshs.{totalSalary.toLocaleString()}
                      </p>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h1>Company Issued Equipment</h1>
                  </CardTitle>
                  <CardDescription className="">
                    <div className="flex flex-col space-y-3 mt-5">
                      {employee.company_equipment.length > 0 ? (
                        employee.company_equipment.map((equipment) => (
                          <p
                            key={equipment.equipment_number}
                            className="text-sm text-gray-500 flex flex-col gap-1"
                          >
                            <span className="font-bold">{equipment.title}</span>
                            <span className="text-gray-500">
                              {equipment.details}
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>No company issued equipment</p>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <h1>Personal Documents</h1>
                  </CardTitle>
                  <CardDescription className="">
                    <div className="flex flex-col space-y-3 mt-5">
                      {employee.personal_documents.length > 0 ? (
                        employee.personal_documents.map((document) => (
                          <p
                            key={document.document_number}
                            className="text-sm text-gray-500 flex flex-col gap-1"
                          >
                            <span className="font-bold">{document.type}</span>
                            <span className="text-gray-500">
                              {document.document_number}
                            </span>
                          </p>
                        ))
                      ) : (
                        <p>No personal documents</p>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  <h1>Certifications</h1>
                </CardTitle>
                <CardDescription>
                  <div className="mt-5 space-y-3">
                    {employee.certifications.map((certificate) => (
                      <Card key={certificate.name}>
                        <CardHeader>
                          <CardTitle className="flex justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <GraduationCap />
                              <h5 className="text-md font-md capitalize">
                                {certificate.name} ({certificate.certification})
                                - {certificate.institution}
                              </h5>
                            </div>
                            <p>{certificate.year}</p>
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
