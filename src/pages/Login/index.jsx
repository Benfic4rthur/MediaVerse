import { useEffect, useState } from 'react';
import { RxEnvelopeClosed, RxLockClosed } from 'react-icons/rx';
import { redirect } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthentication } from '../../hooks/useAuthentication';
import { ButtonForm, ContainerForm, Error, Form } from '../../styles/formStyled';
import { ContainerCenter, LinkStyled, Subtitle } from '../../styles/styledGlobal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = UseAuthentication();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const user = {
      email,
      password,
    };
    const res = await login(user);
    console.log(res);
    redirect('/');
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  useEffect(() => {
    document.title = 'MediaVerse - Login';
  }, []);

  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Entrar</Subtitle>
        <Form onSubmit={handleSubmit}>
          <CreateInput
            Svg={RxEnvelopeClosed}
            aria-label='Email'
            type='email'
            name='email'
            required
            placeholder='E-mail do usuário'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <CreateInput
            Svg={RxLockClosed}
            aria-label='Senha'
            type='password'
            name='password'
            required
            placeholder='Senha do usuário'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <ButtonForm disabled={loading}>{loading ? ' Aguarde...' : 'Entrar'}</ButtonForm>
          {error && <Error>{error}</Error>}
          <h4>
            Esqueceu sua senha?{' '}
            <LinkStyled to='/forgot-password' style={{ textDecoration: 'none' }}>
              Clique aqui!
            </LinkStyled>
          </h4>
        </Form>
      </ContainerForm>
      <div></div>
    </ContainerCenter>
  );
};

export default Login;
