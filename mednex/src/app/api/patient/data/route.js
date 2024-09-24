import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import jwt from "jsonwebtoken";
import { db } from "../../../../firebase/firebaseConfig";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header missing." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { error: "Token missing from Authorization header." },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      console.log("Decoded JWT:", decodedToken);
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const userId = decodedToken.userId || decodedToken.uid;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID missing in token payload." },
        { status: 400 }
      );
    }

    console.log("Extracted UID from JWT:", userId);

    try {
      const patientDocRef = doc(db, "patients", userId);
      const patientDoc = await getDoc(patientDocRef);

      if (!patientDoc.exists()) {
        return NextResponse.json(
          { error: "Patient not found." },
          { status: 404 }
        );
      }

      const patientData = patientDoc.data();
      console.log("Patient data fetched:", patientData);
      return NextResponse.json({ patient: patientData }, { status: 200 });
    } catch (error) {
      console.error("Error fetching patient data from Firestore:", error.message);
      return NextResponse.json(
        { error: "Error fetching patient data from Firestore." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in GET /only-patients:", error.message);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
