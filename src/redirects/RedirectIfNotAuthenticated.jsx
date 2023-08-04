import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAuthenticated() {
  const { user } = UseAuthValue();

  return user ? <Navigate to='/' replace={true} /> : <Outlet />;
}
