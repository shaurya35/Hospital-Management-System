"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPatientData() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await fetch("/api/patient/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPatient(data.patient);
        } else {
          setError(data.error || "Failed to fetch patient data.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error.message);
        setError("An unexpected error occurred.");
      }
    }

    fetchPatientData();
  }, [router]);

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => router.push("/login")}>Go to Login</button>
      </div>
    );
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patient-dashboard">
      <h1>Welcome, {patient.patientName}</h1>
      <p>Email: {patient.patientEmail}</p>
      <p>Address: {patient.patientAddress}</p>
      <p>Phone Number: {patient.patientPhoneNumber}</p>
    </div>
  );
}
