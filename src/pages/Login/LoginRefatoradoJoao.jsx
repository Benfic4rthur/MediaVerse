import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import { RxEnvelopeClosed, RxLockClosed } from 'react-icons/rx';
import { Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { db } from '../../firebase/config';
import { ButtonForm, ContainerForm, Error, Form as FormStyled } from '../../styles/formStyled';
import { ContainerCenter } from '../../styles/styledGlobal';
import { login } from '../../utils/Login';

const Index = () => {
  const navigation = useNavigation();
  const action = useActionData();
  const loading = navigation.state !== 'idle';

  useEffect(() => {
    document.title = 'MediaVerse- Login';
  }, []);

  return (
    <ContainerCenter>
      <ContainerForm>
        <h1>Entrar</h1>
        <FormStyled as={Form} method='POST'>
          <CreateInput
            Svg={RxEnvelopeClosed}
            aria-label='Email'
            type='email'
            name='email'
            required
            placeholder='E-mail do usuário'
          />
          <CreateInput
            Svg={RxLockClosed}
            aria-label='Senha'
            type='password'
            name='password'
            required
            placeholder='Senha do usuário'
          />
          <ButtonForm disabled={loading}>{loading ? ' Aguarde...' : 'Entrar'}</ButtonForm>
          {action?.error && <Error>{action?.error}</Error>}
          <h4>
            Esqueceu sua senha?{' '}
            <Link to='/forgot-password' style={{ textDecoration: 'none' }}>
              {' '}
              Clique aqui!
            </Link>
          </h4>
        </FormStyled>
      </ContainerForm>
      <div></div>
    </ContainerCenter>
  );
};

export default Index;

export async function loginAction({ request }) {
  const data = await request.formData();

  const formData = Object.fromEntries(data);

  const res = await login(formData);

  if (res.success) {
    return redirect('/');
  } else {
    return res;
  }
}

export async function createUser({ email = '', password = '', displayName = '' }) {
  const auth = getAuth();
  let error = '';

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: displayName });

    // Salvar displayName no Firestore
    await db.collection('users').doc(user.uid).set({
      displayName: displayName,
    });

    return { error, success: true, user };
  } catch (err) {
    if (err.message.includes('Password')) {
      error = 'A senha precisa conter ao menos 6 caracteres!';
    } else if (err.message.includes('auth/email-already-in-use')) {
      error = 'E-mail já cadastrado!';
    } else {
      error = 'Ocorreu um erro ao criar o usuário, por favor tente novamente mais tarde!';
    }
    return { error, success: false };
  }
}
