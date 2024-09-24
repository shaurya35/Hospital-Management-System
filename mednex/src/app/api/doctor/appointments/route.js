// /src/app/api/doctor/appointments/route.js

import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

export async function GET(request) {
  try {
    // Extract doctor's name from query parameters
    const url = new URL(request.url);
    const doctorName = url.searchParams.get("doctorName");

    if (!doctorName) {
      return NextResponse.json({ error: "Doctor name is required." }, { status: 400 });
    }

    const patientsRef = collection(db, "patients");
    const querySnapshot = await getDocs(patientsRef);

    const appointments = [];

    for (const doc of querySnapshot.docs) {
      const patientData = doc.data();
      const patientAppointments = patientData.appointments || [];

      patientAppointments.forEach((appointment) => {
        if (appointment.doctor === doctorName) {
          appointments.push({
            patientId: doc.id,
            patientName: patientData.patientName, // Ensure patientName is included
            ...appointment
          });
        }
      });
    }

    if (appointments.length === 0) {
      return NextResponse.json({ message: "No appointments found for this doctor." }, { status: 404 });
    }

    return NextResponse.json({ appointments }, { status: 200 });

  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
