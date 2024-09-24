"use client";
import { useState, useEffect } from "react";
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
import { doctors } from "@/lib/data";
import Link from "next/link";
import { getRole } from "@/app/sign-in/role";


const DoctorDashboard = () => {
    const [role, setRole] = useState(null);
useEffect(() => {
    // Retrieve the role from localStorage only on the client side
    setRole(getRole());
  }, []);
  const [cards, setCards] = useState([]);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editableContent, setEditableContent] = useState({
    doctorName: "",
    speciality: "",
    experience: "",
    yearOfJoining: "",
    phoneNumber: "", // Include phoneNumber in the initial state setup
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load data from localStorage or use doctors
  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctorsData"));
    if (savedDoctors) {
      setCards(savedDoctors);
    } else {
      setCards(doctors);
    }
  }, []);

  // Save updated data to localStorage
  const saveEdit = () => {
    const updatedCards = cards.map((card) =>
      card.id === editingCardId ? { ...card, ...editableContent } : card
    );
    setCards(updatedCards);
    localStorage.setItem("doctorsData", JSON.stringify(updatedCards));
    setEditingCardId(null);
    setEditableContent({
      doctorName: "",
      speciality: "",
      experience: "",
      yearOfJoining: "",
      phoneNumber: "", // Reset phoneNumber field after saving
    });
    setIsDialogOpen(false);
  };

  const startEditing = (card) => {
    setEditingCardId(card.id);
    setEditableContent({ ...card }); // Ensure phoneNumber is included in the editableContent
    setIsDialogOpen(true);
  };

  const deleteDoctor = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("doctorsData", JSON.stringify(updatedCards));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableContent((prev) => ({ ...prev, [name]: value }));
  };

  // Filter doctors based on search query
  const filteredDoctors = cards.filter(
    (card) =>
      card.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.yearOfJoining.toString().includes(searchQuery)
  );

  const generateDoctorId = (id, year = new Date().getFullYear()) => {
    const shortYear = year.toString().slice(-2);
    const formattedId = id.toString().padStart(4, "0");
    return `SUDC${shortYear}-${formattedId}`;
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search doctors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 p-2 w-full"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
        {filteredDoctors.map((card) => (
          // <Link>
            <Card key={card.id} className="hover:scale-105 transition-transform duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <Link href={`/list/doctors/${card.id}`}>
                <CardTitle className="text-lg font-bold">
                  {card.doctorName}
                </CardTitle>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-base font-semibold">{card.speciality}</div>
                <p className="text-sm text-muted-foreground">
                  Experience: {card.experience}
                </p>
                <p className="text-sm text-muted-foreground">
                  Year of Joining: {card.yearOfJoining}
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone Number: {card.phoneNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Doctor ID: {generateDoctorId(card.id, card.yearOfJoining)}
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
                          <DialogTitle>Edit {card.doctorName}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            name="doctorName"
                            value={editableContent.doctorName}
                            onChange={handleInputChange}
                            placeholder="Doctor Name"
                            className="border-2  p-1 mb-2 w-full"
                          />
                          <Input
                            name="speciality"
                            value={editableContent.speciality}
                            onChange={handleInputChange}
                            placeholder="Speciality"
                            className="border-2  p-1 mb-2 w-full"
                          />
                          <Input
                            name="experience"
                            value={editableContent.experience}
                            onChange={handleInputChange}
                            placeholder="Experience"
                            className="border-2  p-1 mb-2 w-full"
                          />
                          <Input
                            name="yearOfJoining"
                            value={editableContent.yearOfJoining}
                            onChange={handleInputChange}
                            placeholder="Year of Joining"
                            className="border-2  p-1 w-full"
                          />
                          <Input
                            name="phoneNumber"
                            value={editableContent.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
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
                      onClick={() => deleteDoctor(card.id)}
                      className="text-red-500 cursor-pointer hover:font-bold transition-all duration-300"
                    >
                      Delete
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          // </Link>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
