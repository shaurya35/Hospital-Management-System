"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import cer1 from "../../assets/1.png";
import cer2 from "../../assets/2.png";
import { usePDF } from "react-to-pdf";
import "./page.css";
import html2canvas from "html2canvas";

const Certificate = () => {
  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState({
    doctorName: "",
    doctorSpecialization: "",
  });
  const [code, setCode] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "prescription.pdf" });
  const pdfRef = useRef(null);

  useEffect(() => {
    // Fetch doctor data from local storage
    const doctorName = localStorage.getItem("doctorName");
    const doctorSpecialization = localStorage.getItem("speciality");

    setDoctorData({
      doctorName: doctorName || "Unknown Doctor",
      doctorSpecialization: doctorSpecialization || "Unknown Specialization",
    });
  }, []);

  const handleFetchData = async () => {
    try {
      const response = await fetch("/api/doctor/patient-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        const { data } = await response.json();
        setPatientData(data);
      } else {
        console.error("Error fetching patient data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

const handleSavePrescription = async () => {
  try {
    const canvas = await html2canvas(targetRef.current);
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.error("Failed to generate Blob");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64String = reader.result.split(",")[1];
        console.log("Code:", code);
        console.log("Base64 String:", base64String);

        const response = await fetch("/api/doctor/save-prescription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            prescription: base64String,
          }),
        });

        if (response.ok) {
          console.log("Prescription saved successfully!");
        } else {
          console.error("Error saving prescription.");
        }
      };
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div>
      {/* Input field and button to fetch patient data */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter 10-digit code"
      />
      <button onClick={handleFetchData}>Fetch Patient Data</button>

      <br />

      {/* Container for certificate preview */}
      <div className="container" ref={targetRef}>
        <Image src={cer1} alt="certificate 1" width={700} className="pres" />

        <div className="content">
          {doctorData && (
            <>
              <div className="doctorName font abs">{doctorData.doctorName}</div>
              <div className="doctorSpecialization font abs">
                {doctorData.doctorSpecialization}
              </div>
            </>
          )}
          {patientData ? (
            <>
              <div className="patientName font abs">{patientData.patientName}</div>
              <div className="patientDob font abs">{patientData.patientDateOfBirth}</div>
              <div className="patientPhone font abs">{patientData.patientPhoneNumber}</div>
              <div className="patientGender font abs">{patientData.patientGender}</div>
              <div className="patientEmail font abs">{patientData.patientEmail}</div>
              <div className="patientAddress font abs">{patientData.patientAddress}</div>
            </>
          ) : (
            <p>No patient data available.</p>
          )}
        </div>

        <Image src={cer2} alt="certificate 2" width={800} />
      </div>

      <br />

      {/* Button to save prescription to Firestore */}
      <button onClick={handleSavePrescription}>Save Prescription to Database</button>
    </div>
  );
};

export default Certificate;
