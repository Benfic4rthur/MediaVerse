import { Navigate, Outlet } from 'react-router-dom';
import { UseAuthValue } from '../context/AuthContext';

export function RedirectIfAuthenticated() {
      const User = UseAuthValue();

  return User?.user ? <Outlet /> : <Navigate to='access' replace={true} />;
}
