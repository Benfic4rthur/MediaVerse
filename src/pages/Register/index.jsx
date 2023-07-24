/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { LuBuilding, LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthentication } from '../../hooks/useAuthentication';

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
  const [userCnpj, setUserCnpj] = useState('');
  const [loggedOutAt, setLoggedOutAt] = useState(Date.now().toString());

  useLayoutEffect(() => {
    document.title = 'MediaVerse- Novo Usuário';
  }, []);

  const { createUser, error: authError, loading, successMessage, auth } = UseAuthentication();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const cleanedCnpj = userCnpj.replace(/\D/g, '');
    const userIdMail = email;

    const user = {
      displayName,
      email,
      phoneNumber: cleanedPhoneNumber,
      userId: userIdMail,
      userName,
      userCnpj: cleanedCnpj,
      password,
      userStatus,
      deletedAt,
      loggedOutAt,
    };

    if (userStatus === '') {
      setError('por favor selecione o tipo de usuário');
      return;
    }

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
          Svg={LuMail}
          aria-label='E-mail do estabelecimento'
          type='email'
          name='email'
          required
          placeholder='E-mail do estabelecimento'
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
          <option value='cliente'>Cliente</option>
          <hr />
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
