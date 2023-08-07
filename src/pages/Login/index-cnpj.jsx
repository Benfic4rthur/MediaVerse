import { useEffect, useLayoutEffect, useState } from 'react';
import { LuBuilding } from 'react-icons/lu';
import { RxLockClosed } from 'react-icons/rx';
import InputMask from 'react-input-mask';
import { redirect } from 'react-router-dom';
import { CreateInput } from '../../components/CreateInput';
import { UseAuthentication } from '../../hooks/useAuthentication';
import { ButtonForm, ContainerForm, Error, Form } from '../../styles/formStyled';
import { ContainerCenter, LinkStyled, Subtitle } from '../../styles/styledGlobal';

export const Login = () => {
  const [userCnpj, setUserCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = UseAuthentication();

  const cleanedCnpj = userCnpj.replace(/\D/g, '');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const user = {
      userCnpj: cleanedCnpj,
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

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Login';
  }, []);

  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Entrar</Subtitle>
        <Form onSubmit={handleSubmit}>
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
            Svg={RxLockClosed}
            aria-label='Senha'
            type='password'
            name='password'
            required
            placeholder='SENHA'
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='off'
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
