import { db } from "../../../../firebase/firebaseConfig";
import { getDocs, query, where, collection, updateDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const { code, prescription } = await req.json();
    console.log("Received code:", code); // Log the received code
    console.log("Received prescription:", prescription); // Log the received prescription

    // Query Firestore to find the patient by code
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("patientCode", "==", code));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const patientDoc = querySnapshot.docs[0].ref;

      // Update the patient's document with the prescription
      await updateDoc(patientDoc, {
        patientPrescription: prescription,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
      });
    } else {
      console.log("Patient not found with code:", code); // Log if patient is not found
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error saving prescription:", error);
    return new Response(JSON.stringify({ error: "Error saving prescription" }), {
      status: 500,
    });
  }
}
