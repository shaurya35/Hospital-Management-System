"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  FileTextIcon,
  ActivityIcon,
  CalendarIcon,
  PlusIcon
} from "lucide-react";
import { reports } from "@/lib/data";
import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";

export default function Component() {
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredReports = reports.filter(
    (report) =>
      (report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.testName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" || report.type.toLowerCase() === activeTab)
  );

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-green-main">
        Patient Reports
      </h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input
            className="pl-8"
            placeholder="Search by patient name, ID, or test..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
        {(role === "admin" || role === "lab") && (
            <Button className="bg-green-main hover:bg-green-700">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Report
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-green-main text-green-main hover:bg-green-50"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reports Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2">
                <FileTextIcon className="h-4 w-4 text-green-main" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-xl font-semibold">{reports.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2">
                <ActivityIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-semibold">
                  {
                    reports.filter((report) => report.status === "Completed")
                      .length
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <CalendarIcon className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-semibold">
                  {
                    reports.filter((report) => report.status === "Pending")
                      .length
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-2">
                <ActivityIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-xl font-semibold">
                  {
                    reports.filter((report) => report.status === "In Progress")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="blood test">Blood Tests</TabsTrigger>
          <TabsTrigger value="scan">Scans</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Patient ID</TableHead>
              <TableHead>Test Type</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Result</TableHead>
              {(role === "admin" || role === "lab") && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">
                  {report.patientName}
                </TableCell>
                <TableCell>{report.patientId}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.testName}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.status === "Completed"
                        ? "default"
                        : report.status === "Pending"
                          ? "secondary"
                          : "outline"
                    }
                    className={
                      report.status === "Completed"
                        ? "bg-green-100 text-green-main"
                        : report.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      report.result === "Normal"
                        ? "default"
                        : report.result === "Abnormal"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      report.result === "Normal"
                        ? "bg-green-100 text-green-main"
                        : report.result === "Abnormal"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {report.result}
                  </Badge>
                </TableCell>
                {(role === "admin" || role === "pharmacy") && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Report</DropdownMenuItem>
                        <DropdownMenuItem>Edit Report</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
