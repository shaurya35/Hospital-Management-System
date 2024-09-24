import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

export async function GET() {
  try {
    const patientsCollectionRef = collection(db, 'patients');

    const querySnapshot = await getDocs(patientsCollectionRef);

    const patients = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient data from Firestore:', error.message);
    return NextResponse.json(
      { error: 'Error fetching patient data from Firestore.' },
      { status: 500 }
    );
  }
}
