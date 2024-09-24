"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ScheduleAppointment = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch upcoming appointments for the logged-in patient
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/patient/appointments");
        const result = await response.json();

        if (response.ok) {
          setAppointments(result.appointments || []);
        } else {
          console.error("Failed to fetch appointments:", result.error);
        }
      } catch (err) {
        console.error("An error occurred while fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleScheduleAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const patientId = "TxrbQhZ5W6g42qkYUzWZvl7xORw1"; 

      const response = await fetch("/api/patient/set-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, doctor, date, time }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || "Appointment scheduled successfully!");
        setAppointments([...appointments, { doctor, date, time }]);
      } else {
        setError(result.error || "Failed to schedule appointment.");
      }
    } catch (err) {
      setError("An error occurred while scheduling the appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-green-dark">Appointments</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-dark">
              Schedule Appointment
            </CardTitle>
            <CardDescription>Choose a doctor and time slot</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleScheduleAppointment}>
              <div className="space-y-2">
                <Label htmlFor="doctor">Select Doctor</Label>
                <select
                  id="doctor"
                  className="w-full rounded-md border border-green-secondary p-2"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Select a Doctor --
                  </option>
                  {[
                    { doctor: "Dr. Arjun Patel", time: "12 years" },
                    { doctor: "Dr. Neha Sharma", time: "8 years" },
                    { doctor: "Dr. Rohan Iyer", time: "15 years" },
                    // Add other doctors here
                  ].map((i, index) => (
                    <option key={index} value={i.doctor}>
                      {i.doctor} - {i.time} of experience
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  className="border-green-secondary"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Input
                  id="time"
                  type="time"
                  className="border-green-secondary"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <Button
                type="submit"
                className="bg-green-main hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-green-dark">
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <li
                    key={index}
                    className="flex justify-between rounded-lg border p-2"
                  >
                    <span>{appointment.doctor}</span>
                    <span>
                      {appointment.date} at {appointment.time}
                    </span>
                  </li>
                ))
              ) : (
                <p>No upcoming appointments.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
