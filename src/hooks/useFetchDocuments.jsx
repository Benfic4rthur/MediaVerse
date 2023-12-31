import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  // lidando com memoryleak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;
      setLoading(true);
      const collectionRef = collection(db, docCollection);
      try {
        let q;
        if (search) {
          const searchTokens = generateSearchTokens(search);
          q = query(
            collectionRef,
            where('searchTokens', 'array-contains-any', searchTokens),
            orderBy('createdAt', 'desc'),
          );
        } else if (uid) {
          q = query(collectionRef, where('uid', '==', uid), orderBy('createdAt', 'desc'));
        } else {
          q = query(collectionRef, orderBy('createdAt', 'desc'));
        }
        onSnapshot(q, querySnapshot => {
          setDocuments(
            querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  const generateSearchTokens = search => {
    const tokens = search.split(' ');
    return tokens;
  };

  return { documents, loading, error };
};
