// import {  updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function UpdateDocument(docCollection, uid, data) {
  try {

    // const docRef =  doc(db, docCollection, uid);

    // const updatedDocument = await updateDoc(docRef, data);
    const updatedDocument = await db.collection(docCollection).doc(uid).update(data);

    return {
      type: 'UPDATED_DOC',
      successMessage: updatedDocument,
      error: '',
    };
  } catch (error) {
    return { type: 'ERROR', error: error.message, successMessage: '' };
  }
}
