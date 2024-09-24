// components/MyPDFDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
});

const MyPDFDocument = ({
  examination,
  indication,
  comparison,
  findings,
  impression,
  vitals,
  bloodReport,
  scanReport,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Examination</Text>
        <Text style={styles.text}>{examination}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Indication</Text>
        <Text style={styles.text}>{indication}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Comparison</Text>
        <Text style={styles.text}>{comparison}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Findings</Text>
        <Text style={styles.text}>{findings}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Impression</Text>
        <Text style={styles.text}>{impression}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Vitals</Text>
        <Text style={styles.text}>Blood Glucose: {vitals.bloodGlucose}</Text>
        <Text style={styles.text}>Temperature: {vitals.temperature}</Text>
        <Text style={styles.text}>Blood Pressure: {vitals.bloodPressure}</Text>
        <Text style={styles.text}>Weight: {vitals.weight}</Text>
        <Text style={styles.text}>SpO2: {vitals.spo2}</Text>
        <Text style={styles.text}>Respiratory Rate: {vitals.respiratoryRate}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Blood Report</Text>
        <Text style={styles.text}>{bloodReport}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Scan Report</Text>
        <Text style={styles.text}>{scanReport}</Text>
      </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
