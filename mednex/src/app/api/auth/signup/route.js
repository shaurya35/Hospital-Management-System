import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebaseConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const {
    email,
    password,
    name,
    phoneNumber,
    dateOfBirth,
    address,
    hospitalId,
  } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const patientCode = await generatePatientCode();

    await setDoc(doc(db, "patients", user.uid), {
      patientEmail: email,
      patientName: name,
      patientPassword: hashedPassword,
      patientPhoneNumber: phoneNumber,
      patientDateOfBirth: dateOfBirth,
      patientAddress: address,
      hospitalId: hospitalId,
      patientCode: patientCode,
    });

    const authToken = jwt.sign(
      { uid: user.uid, email: user.email, usertype: "patient" },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ authToken, usertype: "patient" });

    response.cookies.set("authToken", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const generatePatientCode = async () => {
  const counterRef = doc(db, "counters", "patientCounter");
  const counterSnap = await getDoc(counterRef);

  if (counterSnap.exists()) {
    let lastPatientNumber = counterSnap.data().lastPatientNumber || 0;
    let newPatientNumber = lastPatientNumber + 1;

    if (newPatientNumber > 9999) {
      throw new Error("Patient ID limit of 9999 reached.");
    }

    const newPatientId = `AIPT24${newPatientNumber.toString().padStart(4, "0")}`;

    await updateDoc(counterRef, { lastPatientNumber: newPatientNumber });

    return newPatientId;
  } else {
    const initialPatientNumber = 1;
    const initialPatientId = `AIPH24${initialPatientNumber.toString().padStart(4, "0")}`;

    await setDoc(counterRef, { lastPatientNumber: initialPatientNumber });

    return initialPatientId;
  }
};
