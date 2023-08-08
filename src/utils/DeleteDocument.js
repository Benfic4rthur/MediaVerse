// import { deleteDoc, doc } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function DeleteDocument(docCollection, id) {
  const q = doc(db, docCollection, id);

  return await deleteDoc(q);
}
