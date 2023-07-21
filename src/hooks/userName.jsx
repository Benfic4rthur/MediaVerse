import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useUserInfo = (email) => {
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [deletedAt, setDeletedAt] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userQuery = query(collection(db, 'userInfo'), where('userId', '==', email));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserName(userData.userName);
          setUserStatus(userData.userStatus);
          setDeletedAt(userData.deletedAt);
          setUserId(userData.userId);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  return { userName, userStatus, deletedAt, userId };
};
