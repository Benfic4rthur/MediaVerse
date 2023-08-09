import { db } from '../firebase/config';
import { getDocs, query, where, collection } from 'firebase/firestore';

export const countCollecVideos = async (id) => {
    const postsQuery = query(collection(db, 'posts'), where('collec', '==', id));
    const postsSnapshot = await getDocs(postsQuery);

    return postsSnapshot.size;
}