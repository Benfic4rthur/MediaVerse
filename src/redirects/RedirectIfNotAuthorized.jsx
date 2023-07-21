import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAuthorized() {
  const User = UseAuthValue();

  const IsNotUser = User?.userStatus === 'admin' || User?.userStatus === 'funcionario';

  return IsNotUser ? <Outlet /> : <Navigate to='/access' />;
}
