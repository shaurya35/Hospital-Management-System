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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  BedIcon,
  DollarSignIcon,
  ActivityIcon,
} from "lucide-react";
import { beds } from "@/lib/data";
import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";


export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  const filteredBeds = beds.filter(
    (bed) =>
      (bed.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bed.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bed.patient &&
          bed.patient.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (activeTab === "all" || bed.status.toLowerCase() === activeTab)
  );

  return (
    <div className="mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-green-main">
        Bed Availability Management
      </h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input
            className="pl-8"
            placeholder="Search by bed type, location, or patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            {(role === "admin" || role === "lab") && (
              <DialogTrigger asChild>
                <Button className="bg-green-main hover:bg-green-700">
                  Add New Bed
                </Button>
              </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
              {(role === "admin" || role === "lab") && (
                <DialogHeader>
                  <DialogTitle>Add New Bed</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new bed to add it to the system.
                  </DialogDescription>
                </DialogHeader>
              )}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Input id="type" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rate" className="text-right">
                    Rate
                  </Label>
                  <Input id="rate" type="number" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Bed</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
              <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>ICU</DropdownMenuItem>
              <DropdownMenuItem>General</DropdownMenuItem>
              <DropdownMenuItem>Pediatric</DropdownMenuItem>
              <DropdownMenuItem>Maternity</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bed Availability Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2">
                <BedIcon className="h-4 w-4 text-green-main" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Beds</p>
                <p className="text-xl font-semibold">{beds.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2">
                <ActivityIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-xl font-semibold">
                  {beds.filter((bed) => bed.status === "Available").length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-yellow-100 p-2">
                <BedIcon className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Occupied</p>
                <p className="text-xl font-semibold">
                  {beds.filter((bed) => bed.status === "Occupied").length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-100 p-2">
                <DollarSignIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Rate</p>
                <p className="text-xl font-semibold">
                  $
                  {Math.round(
                    beds.reduce((sum, bed) => sum + bed.rate, 0) / beds.length
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Beds</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="occupied">Occupied</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bed Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rate (per day)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeds.map((bed) => (
              <TableRow key={bed.id}>
                <TableCell className="font-medium">{bed.type}</TableCell>
                <TableCell>{bed.location}</TableCell>
                <TableCell>${bed.rate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      bed.status === "Available" ? "default" : "secondary"
                    }
                    className={
                      bed.status === "Available"
                        ? "bg-green-100 text-green-main"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {bed.status}
                  </Badge>
                </TableCell>
                <TableCell>{bed.patient || "N/A"}</TableCell>
                <TableCell>{bed.equipment.join(", ")}</TableCell>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Bed</DropdownMenuItem>
                      <DropdownMenuItem>
                        {bed.status === "Available"
                          ? "Allocate Bed"
                          : "Discharge Patient"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Remove Bed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
