import { collection, doc, getDocFromCache, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const UseUserManagement = userId => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const getUserData = async () => {
    try {
      const userDataRef = doc(db, 'userInfo', userId);
      const userData = await getDocFromCache(userDataRef);
      setUser({ ...userData.data(), id: userId });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateUser = async updatedData => {
    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');

      // checa se o userName já existe
      const querySnapshot = await getDocs(collection(db, 'userInfo'));
      const existingUser = querySnapshot.docs.find(
        doc => doc.id !== userId && doc.data().userName === updatedData.userName,
      );
      // const ademiro = querySnapshot.docs.find(
      //   doc => doc.id !== userId && updatedData.userName === 'administrador'
      // )

      // if (ademiro){
      //   throw new Error('Você não pode alterar seu nome de usuário para administrador!');
      // }

      if (existingUser) {
        throw new Error('Nome de usuário já existe!');
      }

      const userInfoRef = doc(db, 'userInfo', userId);
      await updateDoc(userInfoRef,  updatedData);

      setUser(updatedData);
      setLoading(false);
      setSuccessMessage('Usuário editado com sucesso!');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserData();
    }

    return () => {
      setUser('');
      setLoading(false);
      setError('');
    };
  }, [userId]);

  return {
    user,
    loading,
    error,
    updateUser,
    successMessage,
  };
};
