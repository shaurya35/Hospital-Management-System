"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { staff } from "@/lib/data";

export default function StaffProfile() {
  const { id } = useParams();
  const [currentStaff, setCurrentStaff] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Find the staff member by ID
    const foundStaff = staff.find((member) => member.id === parseInt(id));
    setCurrentStaff(foundStaff);
  }, [id]);

  if (!currentStaff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto -mt-5 -pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-main">Staff Profile</h1>
        <Button
          variant="outline"
          className="border-green-main text-green-main hover:bg-green-100"
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="h-32 w-32 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt={currentStaff.staffName}
                className="h-full w-full object-cover rounded-full bg-gray-200"
                width={1000}
                height={1000}
              />
            </div>
            <CardTitle className="text-2xl">{currentStaff.staffName}</CardTitle>
            <CardDescription>{currentStaff.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>Employee ID: {currentStaff.code}</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>{currentStaff.email}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>{currentStaff.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>Joined: {currentStaff.yearOfJoining}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Role</h3>
                      <p>{currentStaff.role}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Education</h3>
                      <p>{currentStaff.education}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Skills</h3>
                      <ul className="list-inside list-disc">
                        {currentStaff.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          task: "Update Patient Records",
                          dueDate: "2024-08-30",
                          status: "In Progress",
                        },
                        {
                          task: "Schedule Staff Meeting",
                          dueDate: "2024-08-28",
                          status: "Pending",
                        },
                        {
                          task: "Prepare Monthly Report",
                          dueDate: "2024-09-01",
                          status: "Not Started",
                        },
                        {
                          task: "Coordinate with IT for System Upgrade",
                          dueDate: "2024-08-29",
                          status: "Completed",
                        },
                      ].map((task, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {task.task}
                          </TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                          <TableCell>{task.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="departments">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Head of Department</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: "D1001",
                          name: "Administration",
                          head: "Alice Brown",
                        },
                        { id: "D1002", name: "HR", head: "David Green" },
                        { id: "D1003", name: "Finance", head: "Clara White" },
                        {
                          id: "D1004",
                          name: "IT Support",
                          head: "Michael Black",
                        },
                      ].map((department) => (
                        <TableRow key={department.id}>
                          <TableCell className="font-medium">
                            {department.id}
                          </TableCell>
                          <TableCell>{department.name}</TableCell>
                          <TableCell>{department.head}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  action: "Coordinated with IT for system upgrade",
                  time: "3 hours ago",
                },
                {
                  action: "Reviewed employee attendance records",
                  time: "Yesterday",
                },
                { action: "Scheduled department meetings", time: "2 days ago" },
                {
                  action: "Prepared monthly administrative report",
                  time: "Last week",
                },
              ].map((activity, index) => (
                <li key={index} className="flex items-center">
                  <ClockIcon className="mr-2 h-5 w-5 text-green-main" />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Task Completion Rate
                  </span>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-main"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance Record</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-main"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Employee Satisfaction
                  </span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-main"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
