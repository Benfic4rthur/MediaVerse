import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAdmin() {
  const User = UseAuthValue();

  return User?.userStatus === 'admin' ? <Outlet /> : <Navigate to='/access' />;
}
