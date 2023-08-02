import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function GetCollectionValues(path, Where) {
  const Collection = collection(db, path);

  const q = query(Collection, Where);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(e => ({
    id: e.id,
    ...e.data(),
  }));
}
