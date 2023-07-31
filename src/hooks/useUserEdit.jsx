import { db } from '../firebase/config';
import { useState, useEffect } from 'react';
import { doc, getDocFromCache, updateDoc, collection, getDocs } from 'firebase/firestore';

export const UseUserManagement = userId => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setError(null);
      setSuccessMessage(null);

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
      await updateDoc(userInfoRef, {
        displayName: updatedData.displayName,
        phoneNumber: updatedData.phoneNumber,
        userName: updatedData.userName,
        userStatus: updatedData.userStatus,
        userGender: updatedData.userGender,
      });

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
      setUser(null);
      setLoading(null);
      setError(null);
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
