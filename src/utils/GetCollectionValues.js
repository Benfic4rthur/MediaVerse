import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function GetCollectionValues(path, Where, DocId = "") {
  let Collection = '';

  if (DocId) {
    Collection = collection(db, path, [DocId]);
    console.log(Collection);
  } else {
    Collection = collection(db, path);
  }

  const q = query(Collection, Where);

  const querySnapshot = await getDocs(q);

  console.log(querySnapshot);

  return querySnapshot.docs.map(e => ({
    id: e.id,
    ...e.data(),
  }));
}
