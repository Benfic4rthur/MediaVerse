import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const useIncrementViews = (docCollection, id) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const incrementViews = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data();
          await updateDoc(docRef, {
            views: postData.views + 1,
          });
        } else {
          setError("Documento não encontrado");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    };

    incrementViews();
  }, [docCollection, id]);

  return { loading, error };
};
