import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function FetchTags(docCollection = '', searchTokens) {
  const collectionRef = collection(db, docCollection);

  if (searchTokens) {
    const queryData = query(
      collectionRef,
      where("collec", '==', searchTokens),
      orderBy('createdAt', 'desc'),
    );

    const querySnapshot = await getDocs(queryData);

    const DocumentArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return DocumentArray;
  } else {
    return [];
  }
}
