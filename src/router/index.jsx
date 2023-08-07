/* eslint-disable no-unused-vars */

//react router
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

//pages
import { Access } from '../pages/Access';
import { Account } from '../pages/Account';

import { Dashboard } from '../pages/Dashboard/Index';
import { DashboardPost } from '../pages/Dashboard/Post';
import { DashboardUser } from '../pages/Dashboard/User';

import { EditUser } from '../pages/EditUser';
import { Forgot } from '../pages/Forgot';
import { Home, homeLoader } from '../pages/Home';
import Learning from '../pages/Learning';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

import { CreatePost } from '../pages/Post/Create';
import { EditPost } from '../pages/Post/Edit';
import { Post } from '../pages/Post/Index';
import { PublicPost } from '../pages/Post/Public';

import { Public, publicLoader } from '../pages/Public';
import { Register } from '../pages/Register';

//layouts
import { Layout } from '../layouts/Layout';

// redirects
import { RedirectIfAuthenticated } from '../redirects/RedirectIfAuthenticated';
import { RedirectIfNotAdmin } from '../redirects/RedirectIfNotAdmin';
import { RedirectIfNotAuthenticated } from '../redirects/RedirectIfNotAuthenticated';
import { RedirectIfNotAuthorized } from '../redirects/RedirectIfNotAuthorized';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Rotas disponível para usuários deslogados */}
      <Route element={<RedirectIfNotAuthenticated />}>
        <Route path='/access' element={<Access />} loader={publicLoader} />;
        <Route element={<Layout />}>
          {/* layout que vai ser herdado pelas rotas da aplicação */}
          <Route path='/post/public/:id' element={<PublicPost />} />;
          <Route path='/public' element={<Public />} loader={publicLoader} />;
          <Route path='/login' element={<Login />} />;
          <Route path='/forgot-password' element={<Forgot />} />
        </Route>
      </Route>

      {/* Rotas que só podem ser acessadas após efetuar o login */}
      <Route element={<RedirectIfAuthenticated />}>
        {/* layout que vai ser herdado pelas rotas da aplicação */}
        <Route element={<Layout />}>
          {/* <Route path='/catalog' element={<Catalog />} loader={catalogLoader} action={catalogAction}/>*/}
          {/* <Route path='/search' element={<Search />} /> */}

          <Route index element={<Home />} loader={homeLoader} />
          <Route path='/account' element={<Account />} />
          <Route path='/Learning/:id' element={<Learning />} />
          <Route path='/post/:id' element={<Post />} />

          {/* Rotas que só podem ser acessadas pelo admin e funcionário */}

          <Route element={<RedirectIfNotAuthorized />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/post' element={<DashboardPost />} />
            <Route path='/post/create' element={<CreatePost />} />
            <Route path='/post/edit/:id' element={<EditPost />} />
          </Route>
          {/* Rotas restritas apenas para admin */}

          <Route element={<RedirectIfNotAdmin />}>
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard/user' element={<DashboardUser />} />
            <Route path='/user/edit/:id' element={<EditUser />} />
          </Route>

          {/* Rota não encontrada */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    </Route>,
  ),
);
