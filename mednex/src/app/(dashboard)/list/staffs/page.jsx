"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { staff} from "@/lib/data";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRole } from "@/app/sign-in/role";


const StaffDashboard = () => {
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editableContent, setEditableContent] = useState({
    staffName: "",
    role: "",
    department: "",
    yearOfJoining: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data from localStorage or use staff data
  useEffect(() => {
    const savedStaff = JSON.parse(localStorage.getItem("staffData"));
    if (savedStaff) {
      setCards(savedStaff);
    } else {
      setCards(staff);
    }
  }, []);

  // Save updated data to localStorage
  const saveEdit = () => {
    const updatedCards = cards.map((card) =>
      card.id === editingCardId ? { ...card, ...editableContent } : card
    );
    setCards(updatedCards);
    localStorage.setItem("staffData", JSON.stringify(updatedCards));
    setEditingCardId(null);
    setEditableContent({
      staffName: "",
      role: "",
      department: "",
      yearOfJoining: "",
    });
    setIsDialogOpen(false);
  };

  const startEditing = (card) => {
    setEditingCardId(card.id);
    setEditableContent({ ...card });
    setIsDialogOpen(true);
  };

  const deleteStaff = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("staffData", JSON.stringify(updatedCards));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableContent((prev) => ({ ...prev, [name]: value }));
  };

  // Filter staff based on search query
  const filteredStaff = cards.filter(
    (card) =>
      card.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.yearOfJoining.toString().includes(searchQuery)
  );

  const generateStaffId = (id, year = new Date().getFullYear()) => {
    // Convert year to string and slice the last two digits
    const shortYear = year.toString().slice(-2);
    // Add leading zeros to the ID, ensuring it is 4 digits long
    const formattedId = id.toString().padStart(4, "0");

    return `SUST${shortYear}-${formattedId}`;
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 p-2 w-full"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
        {filteredStaff.map((card) => (
          <Card
            key={card.id}
            className="hover:scale-105 transition-transform duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <Link href={`/list/staffs/${card.id}`}>
                <CardTitle className="text-lg font-bold">
                  {card.staffName}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="text-base font-semibold">{card.role}</div>
              <p className="text-sm text-muted-foreground">
                Department: {card.department}
              </p>
              <p className="text-sm text-muted-foreground">
                Year of Joining: {card.yearOfJoining}
              </p>
              {role !== "patient" && (
                <p className="text-sm text-muted-foreground">
                  Phone Number: {card.phoneNumber}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Staff ID: {generateStaffId(card.id, card.yearOfJoining)}
              </p>
              {role === "admin" && (
                <div className="flex space-x-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <div
                        variant="link"
                        onClick={() => startEditing(card)}
                        className="text-blue-500 cursor-pointer hover:font-bold transition-all duration-300"
                      >
                        Edit
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit {card.staffName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          name="staffName"
                          value={editableContent.staffName}
                          onChange={handleInputChange}
                          placeholder="Staff Name"
                          className="border-2  p-1 mb-2 w-full"
                        />
                        <Input
                          name="role"
                          value={editableContent.role}
                          onChange={handleInputChange}
                          placeholder="Role"
                          className="border-2  p-1 mb-2 w-full"
                        />
                        <Input
                          name="department"
                          value={editableContent.department}
                          onChange={handleInputChange}
                          placeholder="Department"
                          className="border-2  p-1 mb-2 w-full"
                        />
                        <Input
                          name="yearOfJoining"
                          value={editableContent.yearOfJoining}
                          onChange={handleInputChange}
                          placeholder="Year of Joining"
                          className="border-2  p-1 w-full"
                        />
                        <Button onClick={saveEdit} className="mt-2">
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div
                    variant="link"
                    onClick={() => deleteStaff(card.id)}
                    className="text-red-500 cursor-pointer hover:font-bold transition-all duration-300"
                  >
                    Delete
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
