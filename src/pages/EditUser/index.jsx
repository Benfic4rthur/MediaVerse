/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuBuilding, LuPhone, LuUser } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { UseUserManagement } from '../../hooks/useUserEdit'; // Importando o novo hook
import { ButtonForm, ContainerForm, Error, Form, Success } from '../../styles/formStyled';

import { useParams } from 'react-router-dom';

const Index = () => {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userCnpj, setUserCnpj] = useState('');
  const { id: userId } = useParams();

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição de usuário';
  }, []);

  const { user, loading, error: userError, successMessage, updateUser } = UseUserManagement(userId); // Usando o novo hook

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPhoneNumber(user.phoneNumber);
      setUserName(user.userName);
      setUserCnpj(user.userCnpj);
    }
  }, [user]);

  useEffect(() => {
    if (userError) {
      setError(userError);
    }
  }, [userError]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const cleanedCnpj = userCnpj.replace(/\D/g, '');

    const updatedData = {
      displayName,
      phoneNumber: cleanedPhoneNumber,
      userName,
      userCnpj: cleanedCnpj,
    };
    await updateUser(updatedData);
  };

  return (
    <ContainerForm>
      <h1>Edição de Usuário</h1>
      <Form onSubmit={handleSubmit}>
        <CreateInput
          Svg={LuUser}
          aria-label='Nome proprietario'
          type='text'
          name='displayName'
          required
          placeholder='Nome proprietário'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={RxAvatar}
          aria-label='Nome do estabelecimento'
          type='text'
          name='userName'
          required
          placeholder='Nome do estabelecimento'
          value={userName}
          onChange={e => setUserName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuBuilding}
          as={InputMask}
          aria-label='CNPJ'
          mask='99.999.999/9999-99'
          maskPlaceholder={null}
          name='userCnpj'
          required
          placeholder='CNPJ'
          value={userCnpj}
          onChange={e => setUserCnpj(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuPhone}
          as={InputMask}
          aria-label='Celular do usuário'
          mask='(99) 99999-9999'
          maskPlaceholder={null}
          name='celular'
          required
          placeholder='Telefone do estabelecimento'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          autoComplete='off'
        />
        <ButtonForm>{loading ? 'Aguarde...' : 'Atualizar'}</ButtonForm>
        {error && <Error>{error}</Error>}
        {successMessage && (
          <Success>
            <p className='success'>{successMessage}</p>
          </Success>
        )}
      </Form>
    </ContainerForm>
  );
};

export default Index;
