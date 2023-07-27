/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuBuilding, LuPhone, LuUser, LuMail } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
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
  const [userEmail, setUserEmail] = useState('');
  const { id } = useParams();

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição de usuário';
  }, []);

  const { user, loading, error: userError, successMessage, updateUser } = UseUserManagement(id); // Usando o novo hook

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPhoneNumber(user.phoneNumber);
      setUserName(user.userName);
      setUserStatus(user.userStatus);
      setUserEmail(user.userId);
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

    const updatedData = {
      displayName,
      phoneNumber: cleanedPhoneNumber,
      userName,
      userStatus,
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
          Svg={LuMail}
          aria-label='E-mail do usuário'
          type='email'
          name='email'
          required
          placeholder={userEmail}
          disabled
          title="E-mail do usuário"
        />
        <CreateInput
          Svg={MdOutlineAdminPanelSettings}
          as='select'
          required
          value={userStatus}
          onChange={e => setUserStatus(e.target.value)}
        >
          <option value=''>Selecione o tipo de usuário</option>
          <hr />
          <option value='admin'>Administrador</option>
          <hr />
          <option value='funcionario'>Funcionário</option>
          <hr />
          <option value='aluno'>Aluno</option>
        </CreateInput>
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
