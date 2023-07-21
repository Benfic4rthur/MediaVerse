//react router
import { Outlet } from 'react-router-dom';
//components
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
//styled
import { ContainerHidden, Main } from '../styles/styledGlobal';
//theme

export function Layout() {
  return (
    <ContainerHidden>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </ContainerHidden>
  );
}
