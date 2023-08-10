import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FaVenusMars } from 'react-icons/fa';
import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { db } from '../../firebase/config';
// import { UseUserManagement } from '../../hooks/useUserEdit';
import { DialogCurrent } from '../../components/ModalAccount';
import { DialogPhoto } from '../../components/ModalPhoto';
import { UseAuthValue } from '../../context/AuthContext';
import {
  ButtonForm,
  ContainerForm,
  Error as ErrorStyled,
  Form,
  Success,
} from '../../styles/formStyled';
import { Option, Subtitle } from '../../styles/styledGlobal';
import { UpdateDocument } from '../../utils/UpdateDocument';
import { ResetButton } from './styled';

export function Account() {
  const { userData, setReload } = UseAuthValue();
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [CurrentEmail, setCurrentEmail] = useState('');
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setDisplayName(userData.displayName);
    setPhoneNumber(userData.phoneNumber);
    setUserName(userData.userName);
    setUserEmail(userData.userId);
    setUserGender(userData.userGender);
    setPhotoURL(userData.photoURL);
    setAvatarName(userData.avatarName);
  }, [userData]);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição de usuário';
  }, []);

  const successMessage = '';

  const ResetForm = () => {
    setDisplayName(userData.displayName);
    setPhoneNumber(userData.phoneNumber);
    setUserName(userData.userName);
    setUserEmail(userData.userId);
    setUserGender(userData.userGender);
    setPassword('');
    setConfirmPassword('');
    setCurrentEmail('');
    setCurrentPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    setLoading(true);
    try {
      const docCollection = 'userInfo';
      const userInfoQuery = query(collection(db, docCollection), where('userName', '==', userName));
      const userIdQuery = query(collection(db, docCollection), where('userId', '==', userEmail));
      const userInfoSnapshot = await getDocs(userInfoQuery);
      const userIdSnapshot = await getDocs(userIdQuery);
      if (!userInfoSnapshot.empty && userName !== userData.userName) {
        throw new Error('Nome de usuário já existe');
      }

      if (!userIdSnapshot.empty && userEmail !== userData.userId) {
        throw new Error('Email já cadastrado!');
      }

      const newValue = {
        phoneNumber: phoneNumber,
        userName: userName,
        userId: userEmail,
        displayName: displayName,
        userGender: userGender,
      };

      if (CurrentEmail === user?.email) {
        const EmailAuthCredential = EmailAuthProvider.credential(CurrentEmail, CurrentPassword);

        const UserCredential = await reauthenticateWithCredential(user, EmailAuthCredential);

        if (
          (phoneNumber || userName || userEmail || displayName || userGender) &&
          UserCredential?.user?.email
        ) {
          await UpdateDocument('userInfo', userData.id, newValue);
        }

        if (userName !== userData.userName) {
          await updateProfile(UserCredential.user, { displayName: userName });
        }

        if (password === confirmPassword && password !== '') {
          await updatePassword(UserCredential.user, password);
        }

        if (userEmail !== UserCredential?.email) {
          await updateEmail(UserCredential.user, userEmail);
        }

        ResetForm();
        setLoading(false);
        setReload(e => ++e);
      } else {
        throw new Error('E-mail incorreto. Por favor, verifique e tente novamente');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      if (error.message.includes('Email já cadastrado!')) {
        return setError('E-mail já cadastrado!');
      } else if (error.message.includes('Nome de usuário já existe')) {
        return setError('Nome de usuário já existe!');
      } else if (error.message.includes('Password')) {
        return setError('A senha precisa conter ao menos 6 caracteres!');
      } else if (error.message.includes('auth/email-already-in-use')) {
        return setError('E-mail já cadastrado!');
      }
    }
  };
  function checkUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    const func = async () => {
      if (checkUrl(photoURL)) {
        setAvatar(photoURL);
      } else {
        try {
          if (userData.userGender === 'feminino') {
            const AvatarURL = await import(`../../assets/avatares/feminino/${photoURL}.jpg`);
            setAvatar(AvatarURL.default);
          } else {
            const AvatarURL = await import(`../../assets/avatares/masculino/${photoURL}.jpg`);
            setAvatar(AvatarURL.default);
          }
        } catch (error) {
          if (error.code === 'ENOENT') {
            import(`../../assets/notAvatar.jpg`)
              .then(image => setAvatar(image.default))
              .catch(error => console.error(error));
          } else {
            console.error(error);
          }
        }
      }
    };

    func();
  }, [userGender, photoURL]);

  return (
    <ContainerForm>
      <Subtitle>Edição de Usuário</Subtitle>
      <Form onSubmit={handleSubmit}>
        <DialogPhoto
          userGender={userGender}
          setPhotoURL={setPhotoURL}
          setAvatar={setAvatar}
          setAvatarName={setAvatarName}
          avatarName={avatarName}
          collectionId={userData.id}
        >
          <img
            src={avatar}
            alt=''
            style={{ width: '85px', height: '85px', borderRadius: '50%', cursor: 'pointer' }}
          />
        </DialogPhoto>

        <CreateInput
          Svg={LuUser}
          aria-label='Nome do usuário'
          type='text'
          name='displayName'
          required
          placeholder='Nome do usuário'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={RxAvatar}
          aria-label='Apelido do usuário'
          type='text'
          name='userName'
          required
          placeholder='Apelido do usuário'
          value={userName}
          onChange={e => setUserName(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuMail}
          aria-label='E-mail do usuário'
          type='email'
          name='userId'
          required
          placeholder='E-mail do usuário'
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
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
          placeholder='Telefone do usuário'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={FaVenusMars}
          as='select'
          required
          value={userGender}
          onChange={e => setUserGender(e.target.value)}
        >
          <Option value=''>{"             "}Selecionar sexo</Option>
          <Option value='feminino'>{"                   "}feminino</Option>
          <Option value='masculino'>{"                   "}masculino</Option>
        </CreateInput>

        <CreateInput
          Svg={LuLock}
          aria-label='Nova senha'
          type='password'
          name='newPassword'
          placeholder='Nova senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete='off'
        />
        <CreateInput
          Svg={LuLock}
          aria-label='Confirmar senha'
          type='password'
          name='confirmPassword'
          placeholder='Confirmar senha'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          autoComplete='new-password'
        />
        <ResetButton type='reset' onClick={ResetForm}>
          Reset
        </ResetButton>
        <DialogCurrent
          ValueEmail={CurrentEmail}
          ValuePassword={CurrentPassword}
          setValueEmail={setCurrentEmail}
          setValuePassword={setCurrentPassword}
          formSubmitFunction={handleSubmit}
          loading={loading}
        >
          <ButtonForm type='button'>{loading ? 'Aguarde...' : 'Atualizar'}</ButtonForm>
        </DialogCurrent>

        {error && <ErrorStyled>{error}</ErrorStyled>}
        {successMessage && (
          <Success>
            <p className='success'>{successMessage}</p>
          </Success>
        )}
      </Form>
    </ContainerForm>
  );
}
