
"use client";
import React, { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";
import MyPDFDocument from "./MyPDFDocument";
import { Input } from "@/components/ui/input";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


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

  const [chiefComplaints, setChiefComplaints] = useState([
    { complaint: "", since: "", history: "" },
  ]);
  const [diagnoses, setDiagnoses] = useState([
    { diagnosis: "", type: "", details: "" },
  ]);
  const [medications, setMedications] = useState([
    { name: "", frequency: "", duration: "", route: "", instructions: "" },
  ]);
  const [examination, setExamination] = useState("");
  const [investigation, setInvestigation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [diagnosisSearchQuery, setDiagnosisSearchQuery] = useState("");
  const [filteredDiagnosisSuggestions, setFilteredDiagnosisSuggestions] =
    useState([]);
  const [medicationSearchQuery, setMedicationSearchQuery] = useState("");
  const [filteredMedicationSuggestions, setFilteredMedicationSuggestions] =
    useState([]);

  const addChiefComplaint = () => {
    setChiefComplaints([
      ...chiefComplaints,
      { complaint: "", since: "", history: "" },
    ]);
  };

  const addDiagnosis = () => {
    setDiagnoses([...diagnoses, { diagnosis: "", type: "", details: "" }]);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", frequency: "", duration: "", route: "", instructions: "" },
    ]);
  };

  const handleChange = (setter, index, field, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleDiagnosisSearchChange = (event) => {
    const query = event.target.value;
    setDiagnosisSearchQuery(query);

    if (query) {
      const suggestions = complaints.filter((item) =>
        item.diagnosis.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDiagnosisSuggestions(suggestions);
    } else {
      setFilteredDiagnosisSuggestions([]);
    }
  };

  const handleDiagnosisSuggestionClick = (suggestion, index) => {
    handleChange(setDiagnoses, index, "diagnosis", suggestion.diagnosis);
    setDiagnosisSearchQuery("");
    setFilteredDiagnosisSuggestions([]);
  };

  // Handle suggestion click for Medications
  const handleMedicationSuggestionClick = (suggestion, index) => {
    handleChange(setMedications, index, "name", suggestion.name);
    setMedicationSearchQuery("");
    setFilteredMedicationSuggestions([]);
  };

  const handleMedicationSearchChange = (event) => {
    const query = event.target.value;
    setMedicationSearchQuery(query);

    if (query) {
      const suggestions = medicationsData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicationSuggestions(suggestions);
    } else {
      setFilteredMedicationSuggestions([]);
    }
  };

  const complaints = [
    {
      id: 1,
      complaint: "Fever and chills",
      diagnosis: "Flu or viral infection",
    },
    {
      id: 2,
      complaint: "Shortness of breath",
      diagnosis: "Asthma or respiratory infection",
    },
    {
      id: 3,
      complaint: "Abdominal pain",
      diagnosis: "Gastroenteritis or appendicitis",
    },
    {
      id: 4,
      complaint: "Headache",
      diagnosis: "Migraine or tension headache",
    },
    {
      id: 5,
      complaint: "Nausea and vomiting",
      diagnosis: "Gastritis or food poisoning",
    },
    {
      id: 6,
      complaint: "Joint pain",
      diagnosis: "Arthritis or tendinitis",
    },
    {
      id: 7,
      complaint: "Cough and sore throat",
      diagnosis: "Common cold or pharyngitis",
    },
    {
      id: 8,
      complaint: "Chest pain",
      diagnosis: "Angina or myocardial infarction",
    },
    {
      id: 9,
      complaint: "Dizziness and lightheadedness",
      diagnosis: "Vertigo or dehydration",
    },
    {
      id: 10,
      complaint: "Back pain",
      diagnosis: "Muscle strain or herniated disc",
    },
  ];

  const [patientCode, setPatientCode] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhoneNumber, setPatientPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPatientData = async () => {
    try {
      const response = await fetch("/api/doctor/patient-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: patientCode }),
      });
      const data = await response.json();

      if (data.data) {
        const {
          patientName,
          patientAddress,
          patientDateOfBirth,
          patientEmail,
          patientPhoneNumber,
        } = data.data;

        setPatientName(patientName);
        setPatientAddress(patientAddress);
        setPatientDateOfBirth(patientDateOfBirth);
        setPatientEmail(patientEmail);
        setPatientPhoneNumber(patientPhoneNumber);
        setErrorMessage("");
      } else {
        setErrorMessage("Patient not found");
      }
    } catch (error) {
      setErrorMessage("Error fetching data");
      console.error("Error fetching patient data:", error);
    }
  };

  // doctor
  const [doctorData, setDoctorData] = useState({
    doctorName: "",
    doctorSpecialization: "",
  });

  useEffect(() => {
    const doctorName = localStorage.getItem("doctorName");
    const doctorSpecialization = localStorage.getItem("speciality");

    setDoctorData({
      doctorName: doctorName || "Unknown Doctor",
      doctorSpecialization: doctorSpecialization || "Unknown Specialization",
    });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const suggestions = complaints.filter((item) =>
        item.complaint.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion, index) => {
    handleChange(setChiefComplaints, index, "complaint", suggestion.complaint);
    setSearchQuery("");
    setFilteredSuggestions([]);
  };

  const handleVitalChange = (field, value) => {
    setVitals((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGeneratePDF = async () => {
    const doc = (
      <MyPDFDocument
        chiefComplaints={chiefComplaints}
        diagnoses={diagnoses}
        medications={medications}
        examination={examination}
        investigation={investigation}
        vitals={vitals}
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
    <div className="mx-auto space-y-6 p-6  bg-white shadow-md rounded-lg">
      {/* changed patient details  */}
      <div>
        <Input
          value={patientCode}
          onChange={(e) => setPatientCode(e.target.value)}
          placeholder="Enter Patient Code"
        />
        <button onClick={fetchPatientData}>Fetch Patient Data</button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div>
          <label>Patient Name:</label>
          <Input value={patientName} readOnly />

          <label>Patient Address:</label>
          <Input value={patientAddress} readOnly />

          <label>Date of Birth:</label>
          <Input value={patientDateOfBirth} readOnly />

          <label>Email:</label>
          <Input value={patientEmail} readOnly />

          <label>Phone Number:</label>
          <Input value={patientPhoneNumber} readOnly />
        </div>
      </div>

      {/* Doctor Details */}
      {/* Input fields for doctor's name and specialization */}
      <label>Doctor Name:</label>
      <input type="text" value={doctorData.doctorName} readOnly />

      <label>Doctor Specialization:</label>
      <input type="text" value={doctorData.doctorSpecialization} readOnly />

      {/* vitals  */}
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
            <label className="block text-gray-700 font-bold mb-2">
              Respiratory Rate
            </label>
            <input
              type="text"
              value={vitals.respiratoryRate}
              onChange={(e) =>
                handleVitalChange("respiratoryRate", e.target.value)
              }
              className="w-full border rounded p-2 mb-2"
            />
          </div>
        </div>
      </div>

      {/* Chief Complaints */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">
          Chief Complaints
        </h3>
        {chiefComplaints.map((complaint, index) => (
          <div key={index} className="my-4">
            <Input
              type="text"
              placeholder="Search complaints..."
              className="border-2 p-2 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* Display suggestions */}
            {filteredSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-200 rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => handleSuggestionClick(suggestion, index)}
                  >
                    {suggestion.complaint}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="text"
              placeholder="Complaint"
              value={complaint.complaint}
              className="w-full border rounded p-2 mb-2 mt-2"
              onChange={(e) =>
                handleChange(
                  setChiefComplaints,
                  index,
                  "complaint",
                  e.target.value
                )
              }
            />
            <input
              type="date"
              placeholder="Since"
              value={complaint.since}
              min="1900-01-01"
              max={new Date().toISOString().split("T")[0]} // Limits to today
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setChiefComplaints, index, "since", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="History"
              value={complaint.history}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(
                  setChiefComplaints,
                  index,
                  "history",
                  e.target.value
                )
              }
            />
          </div>
        ))}
        <button
          className="bg-green-main text-white py-2 px-4 rounded"
          onClick={addChiefComplaint}
        >
          Add Chief Complaint
        </button>
      </div>
      {/* Examination and Investigation */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Medical Details
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Examination:
          </label>
          <textarea
            className="w-full border rounded p-2 mb-2"
            value={examination}
            onChange={(e) => setExamination(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Investigation:
          </label>
          <textarea
            className="w-full border rounded p-2"
            value={investigation}
            onChange={(e) => setInvestigation(e.target.value)}
          />
        </div>
      </div>
      {/* Diagnoses */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Diagnoses</h3>
        {diagnoses.map((diagnosis, index) => (
          <div key={index} className="mb-4">
            <Input
              type="text"
              placeholder="Search diagnoses..."
              className="border-2 p-2 w-full my-2"
              value={diagnosisSearchQuery}
              onChange={handleDiagnosisSearchChange}
            />
            {/* Display suggestions for Diagnoses */}
            {filteredDiagnosisSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-200 rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                {filteredDiagnosisSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                    onClick={() =>
                      handleDiagnosisSuggestionClick(suggestion, index)
                    }
                  >
                    {suggestion.diagnosis}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="text"
              placeholder="Diagnosis"
              value={diagnosis.diagnosis}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setDiagnoses, index, "diagnosis", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Type"
              value={diagnosis.type}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setDiagnoses, index, "type", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Details"
              value={diagnosis.details}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setDiagnoses, index, "details", e.target.value)
              }
            />
          </div>
        ))}
        <button
          className="bg-green-main text-white py-2 px-4 rounded"
          onClick={addDiagnosis}
        >
          Add Diagnosis
        </button>
      </div>
      {/* Medications */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2 text-gray-800">Medications</h3>
        {medications.map((medication, index) => (
          <div key={index} className="mb-4">
            <Input
              type="text"
              placeholder="Search medications..."
              className="border-2 p-2 my-2 w-full"
              value={medicationSearchQuery}
              onChange={handleMedicationSearchChange}
            />
            {/* Display suggestions for Medications */}
            {filteredMedicationSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-200 rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                {filteredMedicationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                    onClick={() =>
                      handleMedicationSuggestionClick(suggestion, index)
                    }
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="text"
              placeholder="Name"
              value={medication.name}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setMedications, index, "name", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Frequency"
              value={medication.frequency}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setMedications, index, "frequency", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Duration"
              value={medication.duration}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setMedications, index, "duration", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Route"
              value={medication.route}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(setMedications, index, "route", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Instructions"
              value={medication.instructions}
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                handleChange(
                  setMedications,
                  index,
                  "instructions",
                  e.target.value
                )
              }
            />
          </div>
        ))}
        <button
          className="bg-green-main text-white py-2 px-4 rounded"
          onClick={addMedication}
        >
          Add Medication
        </button>
      </div>
      {/* Generate PDF */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleGeneratePDF}
          className="bg-green-main text-white py-2 px-4 rounded"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
