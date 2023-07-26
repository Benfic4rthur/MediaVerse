/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase/config';
import { useState, useEffect } from 'react';
import { doc, getDocFromCache, updateDoc } from 'firebase/firestore';

export const UseUserManagement = userId => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Estado para mostrar mensagem de sucesso

  const getUserData = async () => {
    try {
      const userDataRef = doc(db, 'userInfo', userId);
      const userData = await getDocFromCache(userDataRef);
      // console.log("usuario" , userData.data(), userId);
      setUser({ ...userData.data(), id: userId }); // Adiciona o campo 'id' ao objeto 'userData'
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
      setSuccessMessage(null); // Limpar a mensagem de sucesso antes de criar um novo usuário
      // Atualizar informações no Firestore
      const userInfoRef = doc(db, 'userInfo', userId);
      if (!userInfoRef) {
        throw new Error('Usuário não encontrado!');
      }
      await updateDoc(userInfoRef, {
        displayName: updatedData.displayName,
        phoneNumber: updatedData.phoneNumber,
        userName: updatedData.userName,
        userCnpj: updatedData.userCnpj,
      });

      setUser(updatedData);
      setLoading(false);
      setSuccessMessage('Usuário editado com sucesso!'); // Definir a mensagem de sucesso
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
