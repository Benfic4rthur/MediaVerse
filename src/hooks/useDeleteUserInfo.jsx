import { useState } from 'react';
import { db } from '../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

export const useDeleteUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDocument = async (userId) => {
    setLoading(true);

    try {
      await deleteDoc(doc(db, 'userInfo', userId));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteDocument };
};
