// pages/index.js
"use client";
import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import MyPDFDocument from "./MyPDFDocument";
import { Input } from "@/components/ui/input";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';


function MainComponent() {
  const medicationsData = [
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Amoxicillin" },
    { id: 3, name: "Lisinopril" },
    { id: 4, name: "Metformin" },
    { id: 5, name: "Simvastatin" },
    { id: 6, name: "Omeprazole" },
    { id: 7, name: "Levothyroxine" },
    { id: 8, name: "Amlodipine" },
  ];

  const [vitals, setVitals] = useState({
    bloodGlucose: "",
    temperature: "",
    bloodPressure: "",
    weight: "",
    spo2: "",
    respiratoryRate: "",
  });

  const [examination, setExamination] = useState("");
  const [indication, setIndication] = useState("");
  const [comparison, setComparison] = useState("");
  const [findings, setFindings] = useState("");
  const [impression, setImpression] = useState("");
  const [bloodReport, setBloodReport] = useState("");
  const [scanReport, setScanReport] = useState("");
  
  const handleVitalChange = (field, value) => {
    setVitals((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGeneratePDF = async () => {
    const doc = (
      <MyPDFDocument
        examination={examination}
        indication={indication}
        comparison={comparison}
        findings={findings}
        impression={impression}
        vitals={vitals}
        bloodReport={bloodReport}
        scanReport={scanReport}
      />
    );

    try {
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="mx-auto space-y-6 p-6 bg-white shadow-md rounded-lg">
      {/* Vitals */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Vitals</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Blood Glucose
            </label>
            <input
              type="text"
              value={vitals.bloodGlucose}
              onChange={(e) =>
                handleVitalChange("bloodGlucose", e.target.value)
              }
              className="w-full border rounded p-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Temperature
            </label>
            <input
              type="text"
              value={vitals.temperature}
              onChange={(e) => handleVitalChange("temperature", e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Blood Pressure
            </label>
            <input
              type="text"
              value={vitals.bloodPressure}
              onChange={(e) =>
                handleVitalChange("bloodPressure", e.target.value)
              }
              className="w-full border rounded p-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Weight</label>
            <input
              type="text"
              value={vitals.weight}
              onChange={(e) => handleVitalChange("weight", e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">SpO2</label>
            <input
              type="text"
              value={vitals.spo2}
              onChange={(e) => handleVitalChange("spo2", e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Respiratory Rate</label>
            <input
              type="text"
              value={vitals.respiratoryRate}
              onChange={(e) => handleVitalChange("respiratoryRate", e.target.value)}
              className="w-full border rounded p-2 mb-2"
            />
          </div>
        </div>
      </div>

      {/* Examination */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Examination</h3>
        <textarea
          value={examination}
          onChange={(e) => setExamination(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Indication */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Indication</h3>
        <textarea
          value={indication}
          onChange={(e) => setIndication(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Comparison */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Comparison</h3>
        <textarea
          value={comparison}
          onChange={(e) => setComparison(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Findings */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Findings</h3>
        <textarea
          value={findings}
          onChange={(e) => setFindings(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Impression */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Impression</h3>
        <textarea
          value={impression}
          onChange={(e) => setImpression(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Blood Report */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Blood Report</h3>
        <textarea
          value={bloodReport}
          onChange={(e) => setBloodReport(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Scan Report */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Scan Report</h3>
        <textarea
          value={scanReport}
          onChange={(e) => setScanReport(e.target.value)}
          className="w-full border rounded p-2 mb-2"
          rows="4"
        />
      </div>

      {/* Generate PDF Button */}
      <div className="p-4">
        <button
          onClick={handleGeneratePDF}
          className="px-4 py-2 bg-green-main text-white rounded-md"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
