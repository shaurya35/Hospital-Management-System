// /src/app/doctor/appointments/page.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorName = localStorage.getItem("doctorName");
        
        if (!doctorName) {
          setError("Doctor name not found in local storage.");
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/doctor/appointments?doctorName=${encodeURIComponent(doctorName)}`);
        const result = await response.json();

        if (response.ok) {
          setAppointments(result.appointments || []);
        } else {
          setError(result.error || "Failed to fetch appointments.");
        }
      } catch (err) {
        setError("An error occurred while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // /src/app/doctor/appointments/page.jsx

// ... (rest of the code)

return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-green-dark">Doctor Appointments</h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-green-dark">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading appointments...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : appointments.length > 0 ? (
            <ul className="space-y-2">
              {appointments.map((appointment) => (
                <li
                  key={appointment.patientId + appointment.date + appointment.time}
                  className="flex justify-between rounded-lg border p-2"
                >
                  <span>{appointment.patientName}</span> {/* Display patient name */}
                  <span>
                    {appointment.date} at {appointment.time}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </CardContent>
      </Card>
      <Button onClick={() => router.back()} className="bg-green-main hover:bg-green-700">
        Back
      </Button>
    </div>
  );
  
};

export default DoctorAppointments;
