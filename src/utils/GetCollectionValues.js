import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function GetCollectionValues(path, ...Where) {
  const q = query(collection(db, path), ...Where);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(e => ({
    id: e.id,
    ...e.data(),
  }));
}
