import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfAuthenticated() {
  const { user } = UseAuthValue();

  return user ? <Outlet /> : <Navigate to='access' replace={true} />;
}
