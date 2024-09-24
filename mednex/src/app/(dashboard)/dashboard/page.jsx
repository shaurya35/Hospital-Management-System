"use client";

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
import {
  CalendarDays,
  FileText,
  PlusCircle,
  Activity,
  Pill,
  CheckCircle,
  Star,
  BellRing,
  Users,
  Clipboard,
  AlertTriangle,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";

{
}
export default function Component() {
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  return (
    <>
      {role === "patient" && (
        <div className="mx-auto">
          {/* Patient Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>Raju Rastogi</p>
                </div>
                <div>
                  <p className="font-semibold">Date of Birth:</p>
                  <p>January 15, 1990</p>
                </div>
                <div>
                  <p className="font-semibold">Patient ID:</p>
                  <p>SUPT0002</p>
                </div>
                <div>
                  <p className="font-semibold">Blood Type:</p>
                  <p>A+</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Department</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>June 15, 2023</TableCell>
                    <TableCell>10:00 AM</TableCell>
                    <TableCell>Dr. Anuj</TableCell>
                    <TableCell>Cardiology</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>June 22, 2023</TableCell>
                    <TableCell>2:30 PM</TableCell>
                    <TableCell>Dr. Neha</TableCell>
                    <TableCell>Orthopedics</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <a href="/appointments" target="_blank" rel="noopener noreferrer">
                <Button className="mt-4 bg-green-main">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule New Appointment
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>June 1, 2023</TableCell>
                    <TableCell>Blood Test</TableCell>
                    <TableCell>Dr. Rahul</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>May 15, 2023</TableCell>
                    <TableCell>X-Ray</TableCell>
                    <TableCell>Dr. Patel</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Health Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Pressure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted">
                  <Activity className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted">
                  <Activity className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medication List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Start Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Lisinopril</TableCell>
                    <TableCell>10mg</TableCell>
                    <TableCell>Once daily</TableCell>
                    <TableCell>May 1, 2023</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Metformin</TableCell>
                    <TableCell>500mg</TableCell>
                    <TableCell>Twice daily</TableCell>
                    <TableCell>April 15, 2023</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {role === "doctors" && (
        <div className="mx-auto">
          {/* Doctor Information */}
          <Card className="mb-6">
            <CardContent className="flex items-center space-x-4 pt-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Dr. Jane Smith"
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">Dr. Arjun Patel</h2>
                <p className="text-muted-foreground">Cardiologist</p>
                <p className="text-muted-foreground">SUDC12-0001</p>
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Today&apos;s Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>09:00 AM</TableCell>
                    <TableCell>Anjali Rao</TableCell>
                    <TableCell>Follow-up</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>11:30 AM</TableCell>
                    <TableCell>Rahul Kumar</TableCell>
                    <TableCell>New Patient</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        Waiting
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>02:00 PM</TableCell>
                    <TableCell>Suresh Behera</TableCell>
                    <TableCell>Check-up</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Upcoming
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Statistics and Metrics */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Total Patients
                    </span>
                    <span className="font-bold">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      New Patients (This Month)
                    </span>
                    <span className="font-bold">56</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Avg. Appointments/Day
                    </span>
                    <span className="font-bold">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Patient Satisfaction
                    </span>
                    <span className="font-bold flex items-center">
                      4.8 <Star className="h-4 w-4 text-yellow-400 ml-1" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      On-Time Performance
                    </span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Treatment Success Rate
                    </span>
                    <span className="font-bold">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Review lab results for Patient #12345</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Prepare presentation for medical conference</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Schedule follow-up with post-op patients</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
      {role === "staff" && (
        <div className="mx-auto">
          {/* Hospital Overview */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Bed Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">General Ward</span>
                      <span className="text-sm font-medium">80%</span>
                    </div>
                    <Progress value={80} className="h-2 text-green-main" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">ICU</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2 text-green-main" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Pediatrics</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2 text-green-main" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Room Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Current Wait Time
                    </span>
                    <span className="text-2xl font-bold">35 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Patients Waiting
                    </span>
                    <span className="text-2xl font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Available Doctors
                    </span>
                    <span className="text-2xl font-bold">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Patient Statistics */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">152</h3>
                  <p className="text-sm text-muted-foreground">Inpatients</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">47</h3>
                  <p className="text-sm text-muted-foreground">
                    Admissions Today
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">38</h3>
                  <p className="text-sm text-muted-foreground">
                    Discharges Today
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">89%</h3>
                  <p className="text-sm text-muted-foreground">
                    Bed Occupancy Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Schedule */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Today&apos;s Staff Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Dr. Jay</TableCell>
                    <TableCell>Emergency</TableCell>
                    <TableCell>7:00 AM - 7:00 PM</TableCell>
                    <TableCell>
                      <Badge variant="success">On Duty</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Nurse Sara</TableCell>
                    <TableCell>ICU</TableCell>
                    <TableCell>7:00 AM - 3:00 PM</TableCell>
                    <TableCell>
                      <Badge variant="success">On Duty</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dr. Neha</TableCell>
                    <TableCell>Pediatrics</TableCell>
                    <TableCell>3:00 PM - 11:00 PM</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Upcoming</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Emergency</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 text-green-main" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Surgery</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2 text-green-main" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Pediatrics</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2 text-green-main" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Important Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <BellRing className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>Staff meeting at 2:00 PM in Conference Room A</span>
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span>
                    Shortage of Type O- blood, urgent donations needed
                  </span>
                </li>
                <li className="flex items-center">
                  <Activity className="h-5 w-5 text-green-500 mr-2" />
                  <span>
                    New hospital guidelines issued, check email for details
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>June 15, 2023</TableCell>
                    <TableCell>Equipment malfunction in OR 3</TableCell>
                    <TableCell>Surgery</TableCell>
                    <TableCell>
                      <Badge variant="destructive">Unresolved</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>June 14, 2023</TableCell>
                    <TableCell>Patient fall in Ward 2B</TableCell>
                    <TableCell>General Ward</TableCell>
                    <TableCell>
                      <Badge variant="outline">Under Investigation</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>June 13, 2023</TableCell>
                    <TableCell>Medication error - no harm</TableCell>
                    <TableCell>Pharmacy</TableCell>
                    <TableCell>
                      <Badge variant="success">Resolved</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
      {role === "admin" && (
        <div className="mx-auto">
          {/* Hospital-wide Performance Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">&#8377;24L</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Wait Time
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24 min</div>
                <p className="text-xs text-muted-foreground">
                  -5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Patient Satisfaction
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6/5</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Revenue</span>
                    <span className="text-sm font-medium">&#8377;24L</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Expenses</span>
                    <span className="text-sm font-medium">&#8377;18L</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Profit</span>
                    <span className="text-sm font-medium">&#8377;6L</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Staff Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Total Staff</TableHead>
                    <TableHead>On Duty</TableHead>
                    <TableHead>Vacancies</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Emergency</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell>3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Surgery</TableCell>
                    <TableCell>75</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pediatrics</TableCell>
                    <TableCell>40</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ICU</TableCell>
                    <TableCell>60</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Patient Satisfaction */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Satisfaction Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Overall Experience
                    </span>
                    <span className="text-sm font-medium">4.6/5</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Doctor Care</span>
                    <span className="text-sm font-medium">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Nurse Care</span>
                    <span className="text-sm font-medium">4.7/5</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Cleanliness</span>
                    <span className="text-sm font-medium">4.5/5</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">
                      Low Blood Supply
                    </h4>
                    <p className="text-sm text-yellow-700">
                      Critical shortage of O- blood type. Urgent donations
                      needed.
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-red-800">
                      ICU at Capacity
                    </h4>
                    <p className="text-sm text-red-700">
                      ICU beds are at 98% capacity. Implement overflow
                      procedures.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department Comparisons */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Department Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance">
                <TabsList>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
                <TabsContent value="performance">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Efficiency</TableHead>
                        <TableHead>Patient Satisfaction</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Emergency</TableCell>
                        <TableCell>92%</TableCell>
                        <TableCell>4.5/5</TableCell>
                        <TableCell>
                          <Badge variant="success">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Up
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Surgery</TableCell>
                        <TableCell>88%</TableCell>
                        <TableCell>4.7/5</TableCell>
                        <TableCell>
                          <Badge variant="success">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Up
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pediatrics</TableCell>
                        <TableCell>95%</TableCell>
                        <TableCell>4.8/5</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Stable</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="revenue">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Expenses</TableHead>
                        <TableHead>Profit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Emergency</TableCell>
                        <TableCell>&#8377;8L</TableCell>
                        <TableCell>&#8377;6L</TableCell>
                        <TableCell>&#8377;2L</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Surgery</TableCell>
                        <TableCell>&#8377;12L</TableCell>
                        <TableCell>&#8377;9L</TableCell>
                        <TableCell>&#8377;3L</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pediatrics</TableCell>
                        <TableCell>&#8377;4L</TableCell>
                        <TableCell>&#8377;3L</TableCell>
                        <TableCell>&#8377;1L</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Resource Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Bed Occupancy</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Operating Room Usage
                    </span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Equipment Utilization
                    </span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Staff Utilization
                    </span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
