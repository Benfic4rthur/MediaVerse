/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';
import { FaVenusMars } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthentication } from '../../hooks/useAuthentication';

import { UseAuthValue } from '../../context/AuthContext';
import { ButtonForm, ContainerForm, Error, Form, Success } from '../../styles/formStyled';
import { Subtitle } from '../../styles/styledGlobal';

const Index = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [deletedAt, setDeletedAt] = useState('');
  const [userGender, setUserGender] = useState('');
  // const [userCnpj, setUserCnpj] = useState('');
  const { imgUser } = UseAuthValue();
  const [loggedOutAt, setLoggedOutAt] = useState(Date.now().toString());

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Novo Usuário';
  }, []);

  const { createUser, error: authError, loading, successMessage, auth } = UseAuthentication();

  const RandomImage = (arrayUrl = []) => {
    const random = Math.ceil(Math.random() * (arrayUrl.length - 1));
    const randomAbsolute = Math.abs(random);
    return { url: arrayUrl?.[randomAbsolute], id: randomAbsolute };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    // const cleanedCnpj = userCnpj.replace(/\D/g, '');
    const userIdMail = email;

    if (userStatus === '') {
      setError('por favor selecione o tipo de usuário');
      return;
    }

    if (userGender === '') {
      setError('por favor selecione o sexo do usuário');
      return;
    }

    const photoURL = RandomImage(imgUser[userGender]).url;

    const user = {
      displayName,
      email,
      phoneNumber: cleanedPhoneNumber,
      userId: userIdMail,
      userName,
      // userCnpj: cleanedCnpj,
      userGender,
      photoURL,
      password,
      userStatus,
      deletedAt,
      loggedOutAt,
    };

    if (password !== confirmPassword) {
      setError('As senhas não são iguais');
      return;
    }

    const currentUser = auth.currentUser;

    await createUser(user);

    if (!loading && !authError) {
      await auth.updateCurrentUser(currentUser);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <ContainerForm>
      <Subtitle>Novo Cadastro</Subtitle>
      <Form onSubmit={handleSubmit}>
        <CreateInput
          Svg={LuUser}
          aria-label='Nome usuário'
          type='text'
          name='displayName'
          required
          placeholder='Nome usuário'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={RxAvatar}
          aria-label='userName'
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
          placeholder='E-mail do usuário'
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete='off'
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
          <hr />
        </CreateInput>
        <CreateInput
          Svg={FaVenusMars}
          as='select'
          required
          value={userGender}
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
          placeholder='Telefone do usuário'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuLock}
          aria-label='Senha do usuário'
          type='password'
          name='password'
          required
          placeholder='Senha do usuário'
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuLock}
          aria-label='Confirmação da senha'
          type='password'
          name='confirmPassword'
          required
          placeholder='Confirmação da senha'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          autoComplete='off'
        />
        <ButtonForm disabled={loading}>{loading ? ' Aguarde...' : 'Cadastrar'}</ButtonForm>
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
