// import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function DeleteDocumen(docCollection, id) {
  try {
    // const deletedDocument = await deleteDoc(doc(db, docCollection, id));
    const deletedDocument = await db.collection(docCollection).doc(id).delete();

    return {
      type: 'DELETED_DOC',
      successMessage: deletedDocument,
      error: '',
    };
  } catch (error) {
    return { type: 'ERROR', error: error.message, successMessage: '' };
  }
}
