import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useLayoutEffect, useState } from 'react';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { CreateInput } from '../../components/CreateInput';
import { ButtonForm, ContainerForm, Form } from '../../styles/formStyled';
import { ContainerCenter, LinkStyled, Subtitle } from '../../styles/styledGlobal';

export const Forgot = () => {
  const [email, setEmail] = useState('');
  const auth = getAuth(); // Obtenha a instância do objeto auth do Firebase

  const passwordRecovery = e => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email) // Use o objeto auth para chamar a função sendPasswordResetEmail
      .then(() => {
        window.alert('E-mail de redefinição de senha enviado com sucesso!');
      })
      .catch(error => {
        window.alert(
          'Ocorreu um erro ao enviar o e-mail de redefinição de senha:',
          error?.menssage,
        );
      });
  };

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Reset Password';
  }, []);

  return (
    <ContainerCenter>
      <ContainerForm>
        <Subtitle>Resetar senha</Subtitle>
        <Form onSubmit={passwordRecovery}>
          <CreateInput
            Svg={RxEnvelopeClosed}
            aria-label='Email'
            type='email'
            name='email'
            required
            value={email}
            placeholder='E-mail do usuário'
            onChange={e => setEmail(e.target.value)}
          />
          <ButtonForm type='submit' value={'Resetar'}>
            Resetar
          </ButtonForm>
          <h4 style={{ color: 'hsl(0, 0%, 95%, 0.7)'}}>
            Resetou sua senha?
            <LinkStyled to='/login' style={{ textDecoration: 'none' }}>
              {' '}
              Faça login!
            </LinkStyled>
          </h4>
        </Form>
      </ContainerForm>
      <div></div>
    </ContainerCenter>
  );
};
