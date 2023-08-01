import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signOut,
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
import { ButtonForm, ContainerForm, Error, Form, Success } from '../../styles/formStyled';
import { Subtitle } from '../../styles/styledGlobal';
import { ResetButton } from './styled';

export function Account() {
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userGmail, setUserGmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [CurrentGmail, setCurrentGmail] = useState('');
  const [CurrentPassword, setCurrentPassword] = useState('');
  const [userGender, setUserGender] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [avatar, setAvatar] = useState('');
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
    console.log(user);
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

      console.log({ DocumentData, Document }, { ...DocumentData, id: Document.id });
      setUserData({ ...DocumentData, id: IdUser });
      setDisplayName(DocumentData.displayName);
      setPhoneNumber(DocumentData.phoneNumber);
      setUserName(DocumentData.userName);
      setUserGmail(DocumentData.userId);
      setUserGender(DocumentData.userGender);
      setPhotoURL(DocumentData.photoURL);
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
    setUserGmail(UserData.userId);
    setUserGender(UserData.userGender);
    setPhotoURL(UserData.photoURL);
    setPassword('');
    setConfirmPassword('');
    setCurrentGmail('');
    setCurrentPassword('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const docCollection = 'userInfo';
      const userInfoQuery = query(collection(db, docCollection),where('userName', '==', e.userName));
      const userIdQuery = query(collection(db, docCollection), where('userId', '==', e.email));
      const userInfoSnapshot = await getDocs(userInfoQuery);
      const userIdSnapshot = await getDocs(userIdQuery);
      if (!userInfoSnapshot.empty) {
        throw new Error('Nome de usuário já existe');
      }
      if (!userIdSnapshot.empty) {
        throw new Error('Email já cadastrado!');
      }
      setLoading(true);

      const newValue = {
        phoneNumber: phoneNumber,
        userName: userName,
        userId: userGmail,
        displayName: displayName,
        userGender: userGender,
        photoURL: photoURL,
      };

      if (CurrentGmail === user?.email) {
        const EmailAuthCredential = EmailAuthProvider.credential(CurrentGmail, CurrentPassword);

        const UserCredential = await reauthenticateWithCredential(user, EmailAuthCredential);

        if (
          (phoneNumber || userName || userGmail || displayName || userGender || photoURL) &&
          UserCredential?.user?.email
        ) {
          await SetNewValueDocument('userInfo', UserData.id, newValue);
          // console.log('Info');
        }

        if (userName !== UserData.userName || photoURL !== UserData.photoURL) {
          await updateProfile(UserCredential.user, { displayName: userName, photoURL });
          // console.log('Name');
        }

        if (password === confirmPassword && password !== '') {
          await updatePassword(UserCredential.user, password);
          // console.log('Password');
        }

        if (userGmail !== UserCredential?.email) {
          await updateEmail(UserCredential.user, userGmail);
          // console.log('Email');
        }

        getUserData(user?.email);

        ResetForm();
        setLoading(false);
        window.location.reload();
      } else {
        // console.log('not email');
        throw new Error('E-mail incorreto. Por favor, verifique e tente novamente');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
      signOut(auth);
      if (error.message.includes('Email já cadastrado!')) {
        return setError('E-mail já cadastrado!');
      }
      if (error.message.includes('Nome de usuário já existe')) {
        return setError('Nome de usuário já existe!');
      }
      if (error.message.includes('Password')) {
        return setError('A senha precisa conter ao menos 6 caracteres!');
      }

      if (error.message.includes('auth/email-already-in-use')) {
        return setError('E-mail já cadastrado!');
      }
    }
  };

  useEffect(() => {
    if (photoURL) {
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
        <DialogPhoto userGender={userGender} setPhotoURL={setPhotoURL}>
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
          value={userGmail}
          onChange={e => setUserGmail(e.target.value)}
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
          ValueEmail={CurrentGmail}
          ValuePassword={CurrentPassword}
          setValueEmail={setCurrentGmail}
          setValuePassword={setCurrentPassword}
          formSubmitFunction={handleSubmit}
          loading={loading}
        >
          <ButtonForm type='button'>{loading ? 'Aguarde...' : 'Atualizar'}</ButtonForm>
        </DialogCurrent>

        {error && <Error>{error.message}</Error>}
        {successMessage && (
          <Success>
            <p className='success'>{successMessage}</p>
          </Success>
        )}
      </Form>
    </ContainerForm>
  );
}
