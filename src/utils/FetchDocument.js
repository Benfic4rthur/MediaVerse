import { db } from "../firebase/config";

export async function FetchDocument(docCollection, id) {
  try {
    const fetchDocument = await db.collection(docCollection).doc(id).get();

    return {
      type: 'FETCH_DOC',
      successMessage: fetchDocument,
      error: '',
    };
  } catch (error) {
    return { type: 'ERROR', error: error.message, successMessage: '' };
  }
}
