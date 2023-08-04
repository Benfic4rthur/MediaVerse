import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAdmin() {
  const { userData } = UseAuthValue();

  return userData?.userStatus === 'admin' ? <Outlet /> : <Navigate to='/access' />;
}
