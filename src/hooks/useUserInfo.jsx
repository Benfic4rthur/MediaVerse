import { useEffect, useState } from 'react';
import { fetchUserInfo } from '../utils/fetchUserInfo';

export const useUserInfo = email => {
  const [userData, setUserData] = useState({
    avatarName: '',
    deletedAt: '',
    displayName: '',
    id: '',
    loggedAt: '',
    loggedOutAt: '',
    phoneNumber: '',
    photoURL: '',
    userGender: '',
    userId: '',
    userName: '',
    userStatus: '',
  });

  useEffect(() => {
    const func = async () => {
      const data = await fetchUserInfo(email);
      setUserData(data);
    };
    
    if (email) {
      func();
    }
  }, [email]);

  return { userData };
};
