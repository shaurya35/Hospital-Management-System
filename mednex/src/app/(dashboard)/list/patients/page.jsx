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
import Link from "next/link";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatientId, setEditingPatientId] = useState(null);
  const [editableContent, setEditableContent] = useState({
    patientName: "",
    patientDateOfBirth: "",
    patientAddress: "",
    patientPhoneNumber: "",
    patientEmail: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/api/patient/all-data");
      const data = await response.json();
      setPatients(data.patients);
    };
    fetchPatients();
  }, []);

  const saveEdit = () => {
    const updatedPatients = patients.map((patient) =>
      patient.id === editingPatientId ? { ...patient, ...editableContent } : patient
    );
    setPatients(updatedPatients);
    setEditingPatientId(null);
    setEditableContent({
      patientName: "",
      patientDateOfBirth: "",
      patientAddress: "",
      patientPhoneNumber: "",
      patientEmail: "",
    });
    setIsDialogOpen(false);
  };

  const startEditing = (patient) => {
    setEditingPatientId(patient.id);
    setEditableContent({ ...patient });
    setIsDialogOpen(true);
  };

  const deletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableContent((prev) => ({ ...prev, [name]: value }));
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientDateOfBirth.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientPhoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.patientEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 p-2 w-full"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:scale-105 transition-transform duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <Link href={`/list/patients/${patient.id}`}>
                <CardTitle className="text-lg font-bold">
                  {patient.patientName}
                </CardTitle>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Date of Birth: {patient.patientDateOfBirth}
              </p>
              <p className="text-sm text-muted-foreground">
                Address: {patient.patientAddress}
              </p>
              <p className="text-sm text-muted-foreground">
                Phone Number: {patient.patientPhoneNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                Email: {patient.patientEmail}
              </p>
              <p className="text-sm text-muted-foreground">
                Patient ID: {patient.patientCode}
              </p>

              <div className="flex space-x-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => startEditing(patient)}
                      className="text-blue-500 cursor-pointer hover:font-bold transition-all duration-300"
                    >
                      Edit
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit {patient.patientName}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        name="patientName"
                        value={editableContent.patientName}
                        onChange={handleInputChange}
                        placeholder="Patient Name"
                        className="border-2 p-1 mb-2 w-full"
                      />
                      <Input
                        name="patientDateOfBirth"
                        value={editableContent.patientDateOfBirth}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                        className="border-2 p-1 mb-2 w-full"
                      />
                      <Input
                        name="patientAddress"
                        value={editableContent.patientAddress}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="border-2 p-1 mb-2 w-full"
                      />
                      <Input
                        name="patientPhoneNumber"
                        value={editableContent.patientPhoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="border-2 p-1 w-full"
                      />
                      <Input
                        name="patientEmail"
                        value={editableContent.patientEmail}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="border-2 p-1 w-full"
                      />
                      <Button onClick={saveEdit} className="mt-2">
                        Save
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <div
                  onClick={() => deletePatient(patient.id)}
                  className="text-red-500 cursor-pointer hover:font-bold transition-all duration-300"
                >
                  Delete
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
