import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";

export async function POST(req) {
  try {
    const { patientId, doctor, date, time } = await req.json();

    if (!patientId || !doctor || !date || !time) {
      return NextResponse.json(
        { error: "Patient ID, doctor, date, and time are required." },
        { status: 400 }
      );
    }

    const patientDocRef = doc(db, "patients", patientId);
    const patientDoc = await getDoc(patientDocRef);

    if (!patientDoc.exists()) {
      return NextResponse.json(
        { error: "Patient not found." },
        { status: 404 }
      );
    }

    await updateDoc(patientDocRef, {
      appointments: arrayUnion({
        doctor,
        date,
        time,
      }),
    });

    return NextResponse.json(
      { message: "Appointment scheduled successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    return NextResponse.json(
      { error: "Failed to schedule appointment." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
