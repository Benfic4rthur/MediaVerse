import { useState } from 'react';
import { db } from '../firebase/config';
import { deleteDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';

export const useDeleteCollec = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDocument = async (id, name) => {
    setLoading(true);

    try {
      // Primeiro, verifique se há documentos na coleção "posts" com o campo "colecs" igual ao nome da coleção que está sendo excluída
      const postsQuery = query(collection(db, 'posts'), where('collec', '==', id));
      const postsSnapshot = await getDocs(postsQuery);
      const postsWithMatchingColec = !postsSnapshot.empty;

      if (postsWithMatchingColec) {
        setError(`Não é possível excluir a coleção. Existem posts associados a "${name}".`);
        console.log(`Error: ${error}`);
      } else {
        await deleteDoc(doc(db, 'collec', id));
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteDocument };
};
