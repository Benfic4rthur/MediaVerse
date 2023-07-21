import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAuthenticated() {
  const User = UseAuthValue();

  return User?.user ? <Navigate to='/' replace={true} /> : <Outlet />;
}
