import { db } from '../../../../firebase/firebaseConfig';
import { getDocs, collection, query, where } from 'firebase/firestore';

export async function POST(req) {
  try {
    const { code } = await req.json();
    const q = query(collection(db, 'patients'), where('patientCode', '==', code));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const patientData = querySnapshot.docs[0].data();
      return new Response(JSON.stringify({ data: patientData }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
    });
  }
}
