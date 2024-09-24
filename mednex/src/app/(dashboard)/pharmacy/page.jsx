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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  MoreVerticalIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { newMedications, medications } from "@/lib/data";
import { role } from "@/lib/data";
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
import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";

export default function Component() {
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [Name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [expiry, setExpiry] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission
  const handleMedicine = (e) => {
    e.preventDefault();

    try {
      if (batch.length != 11) {
        alert("Batch number must be exactly 11 digits.");
        return;
      }

      const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
      if (expiry < today) {
        alert("Expiry date cannot be in the past.");
        return;
      }

      const legitMedication = newMedications.find(
        (med) => med.batchNumber === batch
      );
      if (legitMedication) {
        medications.push(legitMedication);
      }
    } catch (e) {
      alert("Batch or Expiry has an issue");
    } finally {
      setName("");
      setBatch("");
      setExpiry("");
    }
    // Reset the input fields (optional)
    setIsDialogOpen(false);
  };

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-0">
      <h1 className="mb-6 text-3xl font-bold text-green-main">
        Pharmacy Inventory
      </h1>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input
            className="pl-8"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog>
            {(role === "admin" || role === "lab") && (
              <DialogTrigger asChild>
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-green-main hover:bg-green-700"
                >
                  Add New Medicine
                </Button>
              </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
              {(role === "admin" || role === "lab") && (
                <DialogHeader>
                  <DialogTitle>Add New Medicine</DialogTitle>
                  <DialogDescription>
                    Enter the details of the medicine to add it to the system.
                  </DialogDescription>
                </DialogHeader>
              )}
              <form onSubmit={handleMedicine}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="batch" className="text-right">
                      Batch No.
                    </Label>
                    <Input
                      id="batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiry" className="text-right">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Medicine</Button>
                </DialogFooter>
              </form>
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

      {(role === "admin" || role === "pharmacy") && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>
              Quick overview of the pharmacy stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-green-100 p-2">
                  <PlusIcon className="h-4 w-4 text-green-main" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Items</p>
                  <p className="text-xl font-semibold">{medications.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-yellow-100 p-2">
                  <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Low Stock Items</p>
                  <p className="text-xl font-semibold">
                    {
                      medications.filter((med) => med.status === "Low Stock")
                        .length
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-2">
                  <SearchIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unique Batches</p>
                  <p className="text-xl font-semibold">
                    {new Set(medications.map((med) => med.batchNumber)).size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-purple-100 p-2">
                  <FilterIcon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Quantity</p>
                  <p className="text-xl font-semibold">
                    {medications.reduce((sum, med) => sum + med.quantity, 0)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Status</TableHead>
              {(role === "admin" || role === "pharmacy") && (
                <TableHead className="text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedications.map((medication) => (
              <TableRow key={medication.id}>
                <TableCell className="font-medium">{medication.name}</TableCell>
                <TableCell>{medication.batchNumber}</TableCell>
                <TableCell>{medication.quantity}</TableCell>
                <TableCell>{medication.expiryDate}</TableCell>
                <TableCell>{medication.supplier}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      medication.status === "In Stock"
                        ? "default"
                        : "destructive"
                    }
                    className={
                      medication.status === "In Stock"
                        ? "bg-green-100 text-green-main"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {medication.status}
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete
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
