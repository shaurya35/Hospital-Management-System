import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase/firebaseConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  doctors,
  staff,
  labTechnicians,
  pharmacists,
  hospitalCode,
} from "../../../../lib/data.js";
import { redirect } from "next/dist/server/api-utils";

export async function POST(request) {
  try {
    const { emailOrCode, password } = await request.json();
    let userRole = "";
    let userId = "";
    let redirectUrl = "";

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailOrCode,
        password
      );
      const firebaseUser = userCredential.user;

      const patientDocRef = doc(db, "patients", firebaseUser.uid);
      const patientDoc = await getDoc(patientDocRef);

      if (patientDoc.exists()) {
        const patientData = patientDoc.data();
        const isPasswordValid = await bcrypt.compare(
          password,
          patientData.patientPassword
        );

        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "Incorrect password." },
            { status: 400 }
          );
        }

        userRole = "patient";
        userId = firebaseUser.uid;
        redirectUrl = `/dashboard`;
      } else {
        return NextResponse.json(
          { error: "No patient data found." },
          { status: 404 }
        );
      }
    } catch (firebaseError) {
      console.log(
        "Firebase authentication failed, checking hardcoded users..."
      );
    }

    if (!userRole) {
      let user =
        doctors.find(
          (doc) => doc.email === emailOrCode || doc.code === emailOrCode
        ) ||
        staff.find(
          (staffMember) =>
            staffMember.email === emailOrCode ||
            staffMember.code === emailOrCode
        ) ||
        labTechnicians.find(
          (lab) => lab.email === emailOrCode || lab.code === emailOrCode
        ) ||
        pharmacists.find(
          (pharm) => pharm.email === emailOrCode || pharm.code === emailOrCode
        );

      if (user) {
        const isPasswordValid = user.password === password;
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "Incorrect password." },
            { status: 400 }
          );
        }

        userRole = user.role;
        userId = user.id;
        redirectUrl = `/dashboard`;
      } else {
        return NextResponse.json(
          { error: "Invalid email or code." },
          { status: 401 }
        );
      }
    }

    const token = jwt.sign(
      { userId, role: userRole },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json(
      {
        message: `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} authentication successful.`,
        role: userRole,
        token,
        redirectUrl,
      },
      { status: 200 }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
