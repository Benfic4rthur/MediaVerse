import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
import {
  ButtonForm,
  ContainerForm,
  Error as ErrorStyled,
  Form,
  Success,
} from '../../styles/formStyled';
import { Subtitle } from '../../styles/styledGlobal';
import { ResetButton } from './styled';
import { mediaUpload } from '../../utils/mediaUpload';

export function Account() {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [CurrentEmail, setCurrentEmail] = useState('');
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [UserData, setUserData] = useState({
    deletedAt: '',
    displayName: '',
    id: '',
    loggedAt: '',
    loggedOutAt: '',
    phoneNumber: '',
    photoURL: '',
    userGender: '',
    userId: '',
    userName: '',
    userStatus: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getUserData(user.email);
  }, [user]);

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Edição de usuário';
  }, []);

  const successMessage = '';

  async function getUserData(email) {
    try {
      const Collection = collection(db, 'userInfo');
      const Where = where('userId', '==', email);

      const querySnapshot = await getDocs(query(Collection, Where));
      const IdUser = querySnapshot.docs[0].id;

      const docRef = doc(db, 'userInfo', IdUser);

      const Document = await getDoc(docRef);

      const DocumentData = Document.data();

      setUserData({ ...DocumentData, id: IdUser });
      setDisplayName(DocumentData.displayName);
      setPhoneNumber(DocumentData.phoneNumber);
      setUserName(DocumentData.userName);
      setUserEmail(DocumentData.userId);
      setUserGender(DocumentData.userGender);
      setPhotoURL(DocumentData.photoURL);
      setAvatarName(DocumentData.avatarName);
    } catch (error) {
      console.error(error.message);
    }
  }

  const SetNewValueDocument = async (collectionPath = 'userInfo', collectionId, newValue) => {
    const docCollection = doc(db, collectionPath, collectionId);

    await updateDoc(docCollection, newValue);
  };

  const ResetForm = () => {
    setDisplayName(UserData.displayName);
    setPhoneNumber(UserData.phoneNumber);
    setUserName(UserData.userName);
    setUserEmail(UserData.userId);
    setUserGender(UserData.userGender);
    setPhotoURL(UserData.photoURL);
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

      if (!userInfoSnapshot.empty && userName !== UserData.userName) {
        setLoading(false);
        return setError('Nome de usuário já existe!');
      }

      if (!userIdSnapshot.empty && userEmail !== UserData.userId) {
        setLoading(false);
        return setError('E-mail já cadastrado!');
      }

      const newValue = {
        phoneNumber: phoneNumber,
        userName: userName,
        userId: userEmail,
        displayName: displayName,
        userGender: userGender,
        photoURL: photoURL,
        avatarName: avatarName,
      };

      if (CurrentEmail === user?.email) {
        const EmailAuthCredential = EmailAuthProvider.credential(CurrentEmail, CurrentPassword);

        const UserCredential = await reauthenticateWithCredential(user, EmailAuthCredential);

        if (
          (phoneNumber || userName || userEmail || displayName || userGender || photoURL) &&
          UserCredential?.user?.email
        ) {
          await SetNewValueDocument('userInfo', UserData.id, newValue);
        }

        if (userName !== UserData.userName || photoURL !== UserData.photoURL) {
          await updateProfile(UserCredential.user, { displayName: userName, photoURL });
        }

        if (password === confirmPassword && password !== '') {
          await updatePassword(UserCredential.user, password);
        }

        if (userEmail !== UserCredential?.email) {
          await updateEmail(UserCredential.user, userEmail);
        }

        getUserData(user?.email);

        ResetForm();
        setLoading(false);
        window.location.reload();
      } else {
        setLoading(false);

        return setError('E-mail incorreto. Por favor, verifique e tente novamente');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      if (error.message.includes('Password')) {
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
    if (checkUrl(photoURL)) {
      setAvatar(photoURL);
    } else {
      if (userGender === 'feminino') {
        import(`../../assets/avatares/feminino/${photoURL}.jpg`)
          .then(image => setAvatar(image.default))
          .catch(error => console.error(error));
      } else {
        import(`../../assets/avatares/masculino/${photoURL}.jpg`)
          .then(image => setAvatar(image.default))
          .catch(error => console.error(error));
      }
    }
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
        >
          <img
            src={avatar}
            alt=''
            style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }}
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
          <option value=''>Selecionar sexo</option>
          <hr />
          <option value='feminino'>feminino</option>
          <hr />
          <option value='masculino'>masculino</option>
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
