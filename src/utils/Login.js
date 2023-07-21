import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export async function login({ email = '', password = '' }) {
  const auth = getAuth();
  let error = '';

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { error, success: true };
  } catch (err) {
    if (err.message.includes('auth/wrong-password')) {
      error = 'Senha incorreta!';
    } else if (err.message.includes('auth/user-not-found')) {
      error = 'Usuário não cadastrado!';
    } else {
      error = 'Ocorreu um erro ao logar, por favor tente novamente mais tarde!';
    }
    return { error, success: false };
  }
}
