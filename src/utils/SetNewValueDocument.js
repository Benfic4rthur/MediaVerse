import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const SetNewValueDocument = async (collectionPath = 'userInfo', collectionId, newValue) => {
  const docCollection = doc(db, collectionPath, collectionId);

  await updateDoc(docCollection, newValue);
};
