import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

 export const fetchUserInfo = async email => {
  try {
    const userQuery = query(collection(db, 'userInfo'), where('userId', '==', email));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      return ({ ...userData, id: userSnapshot?.docs[0]?.id });
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};
