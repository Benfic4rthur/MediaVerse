import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const useUserInfo = email => {
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [deletedAt, setDeletedAt] = useState('');
  const [userId, setUserId] = useState('');
  const [userGender, setUserGender] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [usarData, setUsarData] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userQuery = query(collection(db, 'userInfo'), where('userId', '==', email));
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUsarData({ ...userData, id: userSnapshot?.docs[0]?.id });
          setUserName(userData.userName);
          setUserStatus(userData.userStatus);
          setDeletedAt(userData.deletedAt);
          setUserId(userData.userId);
          setUserGender(userData.userGender);
          setPhotoURL(userData.photoURL);
          console.log(userData);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  return { usarData, userName, userStatus, deletedAt, userId, userGender, photoURL };
};
