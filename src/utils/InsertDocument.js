import { Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function InsertDocument(docCollection, document) {
  try {
    const newDocument = { ...document, createdAt: Timestamp.now() };

    const insertedDocument = await db.collection(docCollection).add(newDocument);
    // await addDoc(collection(db, docCollection), newDocument);

    return {
      type: 'INSERTED_DOC',
      successMessage: insertedDocument,
      error: '',
    };
  } catch (error) {
    return { type: 'ERROR', error: error.message, successMessage: '' };
  }
}

// const insertReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOADING':
//       return {
//         loading: true,
//         error: null,
//         successMessage: null,
//       };
//     case 'INSERTED_DOC':
//       return {
//         loading: false,
//         error: null,
//         successMessage: action.payload,
//       };
//     case 'ERROR':
//       return {
//         loading: false,
//         error: action.payload,
//         successMessage: null,
//       };
//     default:
//       return state;
//   }
// };

// function rest(typeValue, payload, state) {
//   const insertReducers = {
//     LOADING: {
//       error: null,
//       successMessage: null,
//     },
//     INSERTED_DOC: {
//       error: null,
//       successMessage: payload,
//     },
//     ERROR: {
//       error: payload,
//       successMessage: null,
//     },
//   };

//   return insertReducers?.[typeValue] ?? state;
// }
