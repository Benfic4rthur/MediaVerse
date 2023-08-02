import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useEffect, useReducer, useState } from 'react';
import { db } from '../firebase/config';

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        error: null,
        successMessage: null,
      };
    case 'INSERTED_DOC':
      return {
        loading: false,
        error: null,
        successMessage: action.payload,
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.payload,
        successMessage: null,
      };
    default:
      return state;
  }
};

export const useInsertDocument = docCollection => {
  const [cancelled, setCancelled] = useState(false);
  const [response, dispatch] = useReducer(insertReducer, {
    loading: null,
    error: null,
    successMessage: null,
  });

  const checkCancelBeforeDispatch = action => {
    if (!cancelled) dispatch(action);
  };

  const insertDocument = async document => {
    checkCancelBeforeDispatch({ type: 'LOADING' });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(collection(db, docCollection), newDocument);

      checkCancelBeforeDispatch({
        type: 'INSERTED_DOC',
        payload: insertedDocument,
      });
      return insertedDocument;
    } catch (error) {
      checkCancelBeforeDispatch({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
