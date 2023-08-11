import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function FetchDocument(docCollection, id) {
  const q = doc(db, docCollection, id);

  return await getDoc(q);
}
