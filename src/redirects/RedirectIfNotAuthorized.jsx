import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfNotAuthorized() {
  const {  userData } = UseAuthValue();

  const IsNotUser = userData?.userStatus === 'admin' || userData?.userStatus === 'funcionario';

  return IsNotUser ? <Outlet /> : <Navigate to='/access' />;
}
