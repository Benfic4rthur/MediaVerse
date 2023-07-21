import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export const useSoftDelete = () => {
  const softDeleteUser = async userEmail => {
    const getUserInfo = query(collection(db, 'userInfo'), where('userId', '==', userEmail));
    const getUserIdSnapshot = await getDocs(getUserInfo);
    const user = await doc(db, 'userInfo', getUserIdSnapshot.docs[0].id);
    await updateDoc(user, {
      deletedAt: Date.now().toString(),
      loggedOutAt: Date.now().toString(),
    });
  };
  const softRehabUser = async userEmail => {
    const getUserInfo = query(collection(db, 'userInfo'), where('userId', '==', userEmail));
    const getUserIdSnapshot = await getDocs(getUserInfo);
    const user = await doc(db, 'userInfo', getUserIdSnapshot.docs[0].id);
    await updateDoc(user, {
      deletedAt: '',
    });
  };
  return {
    softDeleteUser,
    softRehabUser,
  };
};
