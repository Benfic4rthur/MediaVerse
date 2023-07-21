import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function FetchDocuments(docCollection, search = '', uid = null) {
  const generateSearchTokens = search => {
    const tokens = search.toLocaleLowerCase().split(' ');
    return tokens;
  };

  try {
    let queryData = null;
    let DocumentArray = [];
    let queryError = '';
    const collectionRef = collection(db, docCollection);

    if (search) {
      const searchTokens = generateSearchTokens(search);
      queryData = query(
        collectionRef,
        where('searchTokens', 'array-contains-any', searchTokens),
        orderBy('createdAt', 'desc'),
      );
      
    } else if (uid) {
      queryData = await db
        .collection(docCollection)
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
        .get();
    } else {
      queryData = await query(collectionRef, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(queryData);

    DocumentArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      type: 'UPDATED_DOC',
      data: DocumentArray,
      error: queryError,
    };
  } catch (error) {
    return { type: 'ERROR', error: error.message, data: null };
  }
}


    // const stringInArray = string => {
    //   return [...string].map((_, index) => string.substring(0, index + 1));
    // };

    // const generateSearchToken = title => {
    //   const correctedTitle = title.toLocaleLowerCase().replace(/\s+/g, ' ');

    //   const ArrayTitle = correctedTitle.split(' ');

    //   const substrings = ArrayTitle.reduce((acc, val) => {
    //     return (acc = [...acc, ...stringInArray(val)]);
    //   }, []);

    //   const titleAll = stringInArray(correctedTitle);

    //   const filter = [...substrings, ...titleAll].filter((element, index, arr) => {
    //     return arr.indexOf(element) === index;
    //   });

    //   return filter;
    // };
