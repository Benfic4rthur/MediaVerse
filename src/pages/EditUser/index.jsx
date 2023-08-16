/* eslint-disable no-unused-vars */
import { useEffect, useLayoutEffect, useState } from 'react';
import { FaVenusMars } from 'react-icons/fa';
import { LuMail, LuPhone, LuPlus, LuUser, LuX } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { UseUserManagement } from '../../hooks/useUserEdit';
import { ButtonForm, ContainerForm, Error, Form, Success } from '../../styles/formStyled';

import { useParams } from 'react-router-dom';
import { ContainerTags, Tag, TagUrl } from '../../styles/StyledPostForm';
import { Option, Subtitle } from '../../styles/styledGlobal';
import { GetCollectionValues } from '../../utils/GetCollectionValues';
import { ButtonEvent } from '../Dashboard/Index/styled';

export const EditUser = () => {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentAccessCollection, setCurrentAccessCollection] = useState([])
  const [accessCollection, setAccessCollection] = useState([]);
  const [listAccessCollection, setListAccessCollection] = useState([])
  const [listAddAccessCollection, setListAddAccessCollection] = useState([])
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
    if (user) {
      setDisplayName(user.displayName);
      setPhoneNumber(user.phoneNumber);
      setUserName(user.userName);
      setUserStatus(user.userStatus);
      setUserEmail(user.userId);
      setUserGender(user.userGender);
      setAccessCollection(user?.accessCollection ?? []);

      const func = async () => {
        setCurrentAccessCollection(await GetCollectionValues('collec'));
      };

      func();
    }
  }, [user]);

  useEffect(() => {
    if (userError) setError(userError);
  }, [userError]);

  useEffect(() => {
    const add = currentAccessCollection.filter(e => accessCollection.includes(e.id));
    setListAccessCollection(add);

    const remove = currentAccessCollection.filter(e => !accessCollection.includes(e.id));
    setListAddAccessCollection(remove);
  }, [currentAccessCollection, accessCollection]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    const updatedData = {
      displayName,
      phoneNumber: cleanedPhoneNumber,
      userName,
      userStatus,
      userGender,
      accessCollection,
    };

    await updateUser(updatedData);
  };

  const AddCollection = id => {
    !accessCollection.includes(id) ? setAccessCollection([...accessCollection, id]) : null
  };

  const RemoveCollection = id => {
    setAccessCollection(accessCollection.filter(e => e !== id));
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
          <Option value=''>Selecione o tipo de usuário</Option>
          <Option value='admin'>Administrador</Option>
          <Option value='funcionario'>Funcionário</Option>
          <Option value='aluno'>Aluno</Option>
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
          <Option value=''>Selecionar sexo</Option>
          <Option value='feminino'>feminino</Option>
          <Option value='masculino'>masculino</Option>
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

        <ContainerTags>
          {listAccessCollection.map(e => (
            <Tag key={e.id} title={e.name}>
              <TagUrl src={e?.mediaURL} />
              <p>{e.name}</p>
              <ButtonEvent type='button' onClick={() => RemoveCollection(e.id)}>
                <LuX />
              </ButtonEvent>
            </Tag>
          ))}
        </ContainerTags>
        <ContainerTags>
          {listAddAccessCollection.map(e => (
            <Tag key={e.id} title={e.name}>
              <TagUrl src={e?.mediaURL} />
              <p>{e.name}</p>
              <ButtonEvent type='button' onClick={() => AddCollection(e.id)}>
                <LuPlus />
              </ButtonEvent>
            </Tag>
          ))}
        </ContainerTags>
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
