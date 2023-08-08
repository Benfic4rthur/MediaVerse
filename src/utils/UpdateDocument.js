// import {  updateDoc, doc } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function UpdateDocument(docCollection, uid, data) {
  const q = doc(db, docCollection, uid);

  return await updateDoc(q, data);
}
