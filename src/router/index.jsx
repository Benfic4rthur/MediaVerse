/* eslint-disable no-unused-vars */

//react router
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//pages
import Catalog, { catalogAction, catalogLoader } from '../pages/Catalog';
import CreatePost from '../pages/CreatePost';
import Dashboard from '../pages/Dashboard';
import EditPost from '../pages/EditPost';

import Access from '../pages/Access';
import EditUser from '../pages/EditUser';
import { Forgot } from '../pages/Forgot';
import UserList from '../pages/GetUsers/index';
import Home, { homeLoader } from '../pages/Home';
import Learning from '../pages/Learning';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound/';
import Post from '../pages/Post';
import Register from '../pages/Register';
import Search from '../pages/Search';
import Public, { publicLoader } from '../pages/Public';
import ImageTeste from '../pages/ImageTeste';

//layouts
import { Layout } from '../layouts/Layout';

// redirects
import { RedirectIfAuthenticated } from '../redirects/RedirectIfAuthenticated';
import { RedirectIfNotAdmin } from '../redirects/RedirectIfNotAdmin';
import { RedirectIfNotAuthenticated } from '../redirects/RedirectIfNotAuthenticated';
import { RedirectIfNotAuthorized } from '../redirects/RedirectIfNotAuthorized';
import { PublicPost } from '../pages/PublicPost';
import { Account } from '../pages/Account';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Rotas disponível para usuários deslogados */}
      <Route element={<RedirectIfNotAuthenticated />}>
        <Route path='/access' element={<Access />} loader={publicLoader} />;
        <Route element={<Layout />}>
          {/* layout que vai ser herdado pelas rotas da aplicação */}
          <Route path='/public-post/:id' element={<PublicPost />} />;
          <Route path='/public' element={<Public />} loader={publicLoader} />;
          <Route path='/login' element={<Login />} />;
          <Route path='/forgot-password' element={<Forgot />} />
        </Route>
      </Route>

      {/* Rotas que só podem ser acessadas após efetuar o login */}
      <Route element={<RedirectIfAuthenticated />}>
        {/* layout que vai ser herdado pelas rotas da aplicação */}
        <Route element={<Layout />}>
          <Route index element={<Home />} loader={homeLoader} />
          <Route
            path='/catalog'
            element={<Catalog />}
            loader={catalogLoader}
            action={catalogAction}
          />
          <Route path='/image-teste' element={<ImageTeste />} />
          <Route path='/account' element={<Account />} />
          <Route path='/Learning/:id' element={<Learning />} />
          {/* <Route path='/search' element={<Search />} /> */}
          <Route path='/posts/:id' element={<Post />} />
          {/* Rotas que só podem ser acessadas pelo admin e funcionário */}
          <Route element={<RedirectIfNotAuthorized />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/posts/editpost/:id' element={<EditPost />} />
          </Route>
          {/* Rotas restritas apenas para admin */}
          <Route element={<RedirectIfNotAdmin />}>
            <Route path='/register' element={<Register />} />
            <Route path='/userspanel' element={<UserList />} />
            <Route path='/EditUser/:id' element={<EditUser />} />
          </Route>
          {/* Rota não encontrada */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Route>,
  ),
);
