// components/MyPDFDocument.js
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  gridItem: {
    flexBasis: "30%",
    marginRight: "2%",
    marginBottom: 10,
  },
});

// Create Document Component
const MyPDFDocument = ({
  chiefComplaints,
  diagnoses,
  medications,
  examination,
  investigation,
  vitals,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Siksha O Anusandhan</Text>
        <Text style={styles.title}>Vitals</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.text}>
              Blood Glucose: {vitals.bloodGlucose}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>Temperature: {vitals.temperature}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>
              Blood Pressure: {vitals.bloodPressure}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>Weight: {vitals.weight}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>SpO2: {vitals.spo2}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.text}>
              Respiratory Rate: {vitals.respiratoryRate}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Chief Complaints</Text>
        {chiefComplaints.map((complaint, index) => (
          <Text key={index} style={styles.text}>
            - {complaint.complaint} (Since: {complaint.since}, History:{" "}
            {complaint.history})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Medical Report</Text>
        <Text style={styles.text}>Examination: {examination}</Text>
        <Text style={styles.text}>Investigation: {investigation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Diagnoses</Text>
        {diagnoses.map((diagnosis, index) => (
          <Text key={index} style={styles.text}>
            - {diagnosis.diagnosis} (Type: {diagnosis.type}, Details:{" "}
            {diagnosis.details})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Medications</Text>
        {medications.map((medication, index) => (
          <Text key={index} style={styles.text}>
            - {medication.name} ({medication.frequency}, {medication.duration},{" "}
            {medication.route}, {medication.instructions})
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
