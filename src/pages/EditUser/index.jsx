/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword, updateEmail } from 'firebase/auth';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuBuilding, LuPhone, LuUser, LuMail } from 'react-icons/lu';
import { FaVenusMars } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { UseUserManagement } from '../../hooks/useUserEdit';
import { ButtonForm, ContainerForm, Error, Form, Success } from '../../styles/formStyled';

import { useParams } from 'react-router-dom';
import { Subtitle } from '../../styles/styledGlobal';

const Index = () => {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userGmail, setUserGmail] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const { id } = useParams();


  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição de usuário';
  }, []);

  const { user, loading, error: userError, successMessage, updateUser } = UseUserManagement(id);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPhoneNumber(user.phoneNumber);
      setUserName(user.userName);
      setUserGmail(user.userId);
      setUserStatus(user.userStatus);
      setUserEmail(user.userId);
      setUserGender(user.userGender);
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
      userGender
    };

    await updateUser(updatedData);
  };

  return (
    <ContainerForm>
      <Subtitle>Edição de Usuário</Subtitle>
      <Form onSubmit={handleSubmit}>
        <CreateInput
          Svg={LuUser}
          aria-label='Nome do usuario'
          type='text'
          name='displayName'
          required
          placeholder='Nome do usuario'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={RxAvatar}
          aria-label='Apelido do usuario'
          type='text'
          name='userName'
          required
          placeholder='Apelido'
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
          value={userEmail}
          disabled
          title='E-mail do usuário não pode ser alterado'
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
          Svg={FaVenusMars}
          as='select'
          required
          disabled
          value={userGender}
          title='Sexo do usuário não pode ser alterado'
          onChange={e => setUserGender(e.target.value)}
        >
          <option value=''>Selecionar sexo</option>
          <hr />
          <option value='feminino'>feminino</option>
          <hr />
          <option value='masculino'>masculino</option>
        </CreateInput>
        <CreateInput
          Svg={LuPhone}
          as={InputMask}
          aria-label='Celular do usuário'
          mask='(99) 99999-9999'
          maskPlaceholder={null}
          name='celular'
          required
          placeholder='Telefone do usuario'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          autoComplete='off'
        />
        {/* <CreateInput
          aria-label='E-mail do usuário'
          type='email'
          name='e-mail'
          required
          value={userGmail}
          placeholder='Telefone do estabelecimento'
          onChange={e => setUserGmail(e.target.value)}
          autoComplete='off'
        /> */}
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
