import { useState } from 'react';
import { db } from '../firebase/config';
import { deleteDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';
import { deleteStorageMedia } from '../utils/deleteStorageMedia';

export const useDeleteCollec = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteDocument = async (id, name, thumbName) => {
    setLoading(true);

    try {
      // Primeiro, verifique se há documentos na coleção "posts" com o campo "colecs" igual ao nome da coleção que está sendo excluída
      const postsQuery = query(collection(db, 'posts'), where('collec', '==', id));
      const postsSnapshot = await getDocs(postsQuery);
      const postsWithMatchingColec = postsSnapshot.size;

      if (postsWithMatchingColec > 0) {
        setError(`Não é possível excluir a coleção. Existem posts associados a "${name}".`);
        return false
      } else {
        await deleteDoc(doc(db, 'collec', id));
        deleteStorageMedia('collec', thumbName);
        console.log(`Error:`);
        return true
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      return false
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteDocument };
};
