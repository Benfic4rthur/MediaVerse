import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
      const docRef = doc(db, docCollection, id);
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const isPublic = documentSnapshot.data().isPublic;
        const collecId = documentSnapshot.data().collec;

        // Update publicPost if needed
        if (collecId && typeof isPublic === "boolean" && isPublic) {
          const collecRef = doc(db, 'collec', collecId);
          const collecSnapshot = await getDoc(collecRef);

          if (collecSnapshot.exists()) {
            const collecData = collecSnapshot.data();

            if (collecData.publicPost > 0) {
              await updateDoc(collecRef, { publicPost: collecData.publicPost - 1 });
            }
          } else {
            throw new Error("Collection not found");
          }
        }

        // Delete the post document
        await deleteDoc(docRef);

        checkCancelBeforeDispatch({
          type: "DELETED_DOC",
          payload: docRef,
        });
      } else {
        throw new Error("Document not found");
      }
    } catch (error) {
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { deleteDocument, response };
};
