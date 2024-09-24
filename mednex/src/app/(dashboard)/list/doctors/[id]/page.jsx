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
import { doctors } from "@/lib/data";

export default function DoctorProfile() {
  const { id } = useParams(); 
  const [doctor, setDoctor] = useState(null); 
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Fetch doctor data based on the ID
    const fetchDoctorData = () => {
      const selectedDoctor = doctors.find((doc) => doc.id === parseInt(id));
      if (selectedDoctor) {
        setDoctor(selectedDoctor);
      }
    };

    fetchDoctorData();
  }, [id]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  const generateDoctorId = (id, year = new Date().getFullYear()) => {
    const shortYear = year.toString().slice(-2);
    const formattedId = id.toString().padStart(4, "0");
    return `SUDC${shortYear}-${formattedId}`;
  };

  return (
    <div className=" mx-auto -mt-5 -pt-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-green-main">Doctor Profile</h1>
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
                src={doctor.image || "/placeholder.svg?height=128&width=128"}
                alt="Doctor Image"
                className="h-full w-full object-cover rouned-full bg-gray-200"
                width={1000}
                height={1000}
              />
            </div>
            <CardTitle className="text-2xl">{doctor.doctorName}</CardTitle>
            <CardDescription>{doctor.speciality}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>
                  Employee ID:{" "}
                  {generateDoctorId(doctor.id, doctor.yearOfJoining)}
                </span>
              </div>
              <div className="flex items-center">
                <MailIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>{doctor.email || "No Email Provided"}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>{doctor.phoneNumber}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-green-main" />
                <span>
                  Joined on {doctor.joiningDate || doctor.yearOfJoining}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Doctor Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Education</h3>
                  <p>{doctor.education || "No education available."}</p>

                  <h3 className="text-lg font-semibold">Specializations</h3>
                  <ul className="list-disc pl-6">
                    {doctor.specialization
                      ?.split(", ")
                      .map((specialization, index) => (
                        <li key={index}>{specialization}</li>
                      )) || <li>No specializations provided.</li>}
                  </ul>
                  <h3 className="text-lg font-semibold">Certificates</h3>
                  <ul className="list-disc pl-6">
                    {doctor.certificates?.map((certificates, index) => (
                      <li key={index}>{certificates}</li>
                    )) || <li>No specializations provided.</li>}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead>Morning</TableHead>
                          <TableHead>Afternoon</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            day: "Monday",
                            morning: "Clinic",
                            afternoon: "Surgery",
                          },
                          {
                            day: "Tuesday",
                            morning: "Rounds",
                            afternoon: "Clinic",
                          },
                          {
                            day: "Wednesday",
                            morning: "Surgery",
                            afternoon: "Research",
                          },
                          {
                            day: "Thursday",
                            morning: "Clinic",
                            afternoon: "Clinic",
                          },
                          {
                            day: "Friday",
                            morning: "Rounds",
                            afternoon: "Admin",
                          },
                        ].map((schedule) => (
                          <TableRow key={schedule.day}>
                            <TableCell className="font-medium">
                              {schedule.day}
                            </TableCell>
                            <TableCell>{schedule.morning}</TableCell>
                            <TableCell>{schedule.afternoon}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="patients">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Patients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Admission Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            id: "AIPT24-001",
                            name: "John Doe",
                            date: "2023-05-15",
                            status: "Stable",
                          },
                          {
                            id: "AIPT24-002",
                            name: "Jane Roe",
                            date: "2023-05-18",
                            status: "Critical",
                          },
                          {
                            id: "AIPT24-003",
                            name: "Bob Smith",
                            date: "2023-05-20",
                            status: "Improving",
                          },
                          {
                            id: "AIPT24-004",
                            name: "Alice Johnson",
                            date: "2023-05-22",
                            status: "Stable",
                          },
                        ].map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">
                              {patient.id}
                            </TableCell>
                            <TableCell>{patient.name}</TableCell>
                            <TableCell>{patient.date}</TableCell>
                            <TableCell>{patient.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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
                  action: "Completed surgery for patient P1002",
                  time: "2 hours ago",
                },
                {
                  action: "Updated treatment plan for patient P1003",
                  time: "4 hours ago",
                },
                { action: "Attended department meeting", time: "Yesterday" },
                {
                  action: "Reviewed lab results for patient P1001",
                  time: "2 days ago",
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
                    Patient Satisfaction
                  </span>
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
                    Surgery Success Rate
                  </span>
                  <span className="text-sm font-medium">98%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-main"
                    style={{ width: "98%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Research Publications
                  </span>
                  <span className="text-sm font-medium">15</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-main"
                    style={{ width: "75%" }}
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
