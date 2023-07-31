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
import { LuLock, LuMail, LuPhone, LuUser } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { CreateInput } from '../../components/CreateInput';
import { db } from '../../firebase/config';
// import { UseUserManagement } from '../../hooks/useUserEdit';
import { DialogCurrent } from '../../components/ModalAccount';
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
  const [UserData, setUserData] = useState({
    deletedAt: '',
    displayName: '',
    id: '',
    loggedAt: '',
    loggedOutAt: '',
    phoneNumber: '',
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

      const querySnapshot = query(Collection, Where);
      const { docs } = await getDocs(querySnapshot);
      const IdUser = docs[0].id;

      const docRef = doc(db, 'userInfo', IdUser);

      const Document = await getDoc(docRef);

      const DocumentData = Document.data();

      console.log({ DocumentData, Document }, { ...DocumentData, id: Document.id });
      setUserData({ ...DocumentData, id: IdUser });
      setDisplayName(DocumentData.displayName);
      setPhoneNumber(DocumentData.phoneNumber);
      setUserName(DocumentData.userName);
      setUserGmail(DocumentData.userId);
    } catch (error) {
      console.error(error.message);
    }
  }

  // const SetNewEmail = async (user, newEmail, oldEmail, password) => {
  //   try {

  //     const UserCredential = await signInWithEmailAndPassword(user, oldEmail, password);

  //     await updateEmail(UserCredential.user, newEmail);

  //     return { UserCredential: UserCredential.user, email: newEmail, password };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const SetNewPassword = async (user, newPassword, oldPassword, email) => {
  //   try {

  //     const UserCredential = await signInWithEmailAndPassword(user, email, oldPassword);

  //     await updatePassword(UserCredential.user, newPassword);
  //     console.log('lostt');

  //     return { UserCredential: UserCredential.user, email, password: newPassword };
  //   } catch (err) {
  //     console.error(err);
  //     console.log('123');
  //   }
  // };

  const SetNewValueDocument = async (collectionPath = 'userInfo', collectionId, newValue) => {
    const docCollection = doc(db, collectionPath, collectionId);

    await updateDoc(docCollection, newValue);
  };

  const ResetForm = () => {
    setDisplayName(UserData.displayName);
    setPhoneNumber(UserData.phoneNumber);
    setUserName(UserData.userName);
    setUserGmail(UserData.userId);
    setPassword('');
    setConfirmPassword('');
    setCurrentGmail('');
    setCurrentPassword('');
  };

  // const { updateUser } = UseUserManagement(UserData.id);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const newValue = {
        phoneNumber: phoneNumber,
        userName: userName,
        userId: userGmail,
        displayName: displayName,
      };

      if (CurrentGmail === user?.email) {
        const EmailAuthCredential = EmailAuthProvider.credential(CurrentGmail, CurrentPassword);

        const UserCredential = await reauthenticateWithCredential(user, EmailAuthCredential);

        if ((phoneNumber || userName || userGmail || displayName) && UserCredential?.user?.email) {
          await SetNewValueDocument('userInfo', UserData.id, newValue);
          console.log('Info');
        }

        if (userName !== UserData.userName) {
          await updateProfile(UserCredential.user, { displayName: userName });
          console.log('Name');
        }

        if (password === confirmPassword && password !== '') {
          await updatePassword(UserCredential.user, password);
          console.log('Password');
        }

        if (userGmail !== UserCredential?.email) {
          await updateEmail(UserCredential.user, userGmail);
          console.log('Email');
        }

        getUserData(user?.email);

        ResetForm();
        setLoading(false);
      } else {
        console.log('not email');
        throw new Error('E-mail incorreto. Por favor, verifique e tente novamente');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err);
      signOut(auth);
    }
  };

  return (
    <ContainerForm>
      <Subtitle>Edição de Usuário</Subtitle>
      <Form onSubmit={handleSubmit}>
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

        {error && <Error>{error}</Error>}
        {successMessage && (
          <Success>
            <p className='success'>{successMessage}</p>
          </Success>
        )}
      </Form>
    </ContainerForm>
  );
}
