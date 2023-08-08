/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
import { useLayoutEffect, useState } from 'react';
import { LuEdit, LuPlus, LuTrash2, LuUser } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { RxDividerVertical } from 'react-icons/rx';

import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { UseAuthValue } from '../../../context/AuthContext';
import { useAllUsersInfo } from '../../../hooks/useAllUserInfo';
import { useDeleteUserInfo } from '../../../hooks/useDeleteUserInfo';
import { useSoftDelete } from '../../../hooks/useSoftDelete';
import { CreatePostButton, Subtitle } from '../../../styles/styledGlobal';
import { deleteStorageMedia } from '../../../utils/deleteStorageMedia';
import {
  Author,
  ButtonEvent,
  Card,
  ContRowDate,
  ContRowEdit,
  ContRowInit,
  ContainerButtonEvent,
  ContainerCard,
  ContainerCreatePost,
  ContainerHeader,
  ContainerTitlePost,
  CreatePostTitle,
  UserLoggedBall,
} from './styled';

const FormattedTimeDiff = (loggedAt = 0, loggedOutAt = 0) => {
  let formattedTime = '';

  const loginTime = new Date(Number(loggedAt)).getTime();
  const logoutTime = new Date(Number(loggedOutAt)).getTime();

  const timeDiff = logoutTime - loginTime; // Diferença em milissegundos
  const minutesDiff = Math.ceil(timeDiff / 60000); // Diferença em minutos
  const hoursDiff = Math.floor(timeDiff / 3600000); // Diferença em horas

  if (hoursDiff > 0) {
    formattedTime += hoursDiff + 'h ';

    const remainingMinutes = minutesDiff - hoursDiff * 60;
    if (remainingMinutes > 0) {
      formattedTime += remainingMinutes + 'm';
    }
  } else if (minutesDiff > 0) {
    formattedTime += minutesDiff + 'm';
  } else {
    formattedTime = '0m';
  }

  return formattedTime;
};

export const DashboardUser = () => {
  const { documents: usersInfo } = useAllUsersInfo('userInfo');
  const { user, userData } = UseAuthValue();
  const { deleteDocument } = useDeleteUserInfo();
  const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  const dateUserTime = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' });
  const { softRehabUser, softDeleteUser } = useSoftDelete();
  const handleDelete = (userId, userName, avatarName) => {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o usuário ${userName}?`);
    if (confirmDelete) {
      Promise.all([deleteDocument(userId), deleteStorageMedia('avatars', avatarName)]);
    }
  };

  useLayoutEffect(() => {
    document.title = 'MediaVerse - Painel de Usuários';
  }, []);

  const [userToggles, setUserToggles] = useState({});

  const usersNoAdm = usersInfo?.filter(user => user.userStatus !== 'admin');
  const alluserInfo = usersInfo?.filter(user => user.userName !== 'administrador');
  const filteredUsersInfo = userData.userName !== 'administrador' ? usersNoAdm : alluserInfo;

  const handleToggleChange = (userId, checked) => {
    setUserToggles(prevState => ({ ...prevState, [userId]: checked }));

    checked ? softRehabUser(userId) : softDeleteUser(userId);
  };

  return (
    <div>
      <ContainerHeader>
        <Subtitle>
          Gerencie seus {filteredUsersInfo?.length}{' '}
          {filteredUsersInfo?.length > 1 ? 'Usuários' : 'Usuário'}
        </Subtitle>
        <CreatePostButton as={Link} to='/register'>
          Cadastrar Usuário <LuPlus size={17} />
        </CreatePostButton>
      </ContainerHeader>
      {filteredUsersInfo?.length === 0 ? (
        <ContainerCreatePost>
          <CreatePostTitle>Não foram encontrados usuários cadastrados</CreatePostTitle>
        </ContainerCreatePost>
      ) : (
        <ContainerCard>
          {filteredUsersInfo?.map(user => {
            const { loggedOutAt, loggedAt, userName, deletedAt, id, userId, userStatus } = user;

            const StillLoggedIn = loggedOutAt === 'Ainda logado!';
            const loggedOutAtNum = Number(loggedOutAt);
            const loggedAtNum = Number(loggedAt);

            const userStayLogged = loggedAtNum > loggedOutAtNum || StillLoggedIn;

            return (
              <Card
                key={id}
                deleted={deletedAt}
                title={deletedAt ? 'Usuário Desativado' : 'Usuário Ativo'}
              >
                <ContRowInit className='init'>
                  <ContainerTitlePost>
                    <UserLoggedBall
                      logged={userStayLogged}
                      title={userStayLogged ? 'Usuário Online' : 'Usuário Offline'}
                    />
                  </ContainerTitlePost>
                  <Author>
                    <LuUser size={16} /> {userName} | {userStatus}
                  </Author>
                </ContRowInit>
                <ContRowDate className='edit'>
                  <ButtonEvent as={Link} to={`/user/edit/${id}`} title='editar usuário'>
                    <LuEdit />
                  </ButtonEvent>
                  <ButtonEvent onClick={() => handleDelete(id, userName)} title='Apagar usuário'>
                    <LuTrash2 />
                  </ButtonEvent>
                  <ContainerButtonEvent>
                    <div>
                      <Toggle
                        id={id}
                        checked={userToggles[id] || !deletedAt}
                        onChange={e => handleToggleChange(userId, e.target.checked)}
                      />
                    </div>
                  </ContainerButtonEvent>
                </ContRowDate>

                <ContRowEdit className='date'>
                  {loggedAt ? (
                    <>
                      {/* <Author className='date'>
                        Login: {dateFormat.format(new Date(loggedAtNum)) + 'hrs'}{' '}
                      </Author>
                      <Author className='date'>
                        Logout:{' '}
                        {StillLoggedIn
                          ? 'Usuário ainda logado'
                          : dateFormat.format(new Date(loggedOutAtNum)) + 'hrs'}
                      </Author>

                      <Author className='date'>
                        Tempo de uso:{' '}
                        {StillLoggedIn ? 'Calculando' : FormattedTimeDiff(loggedAt, loggedOutAt)}
                      </Author> */}
                      <Author className='date'>
                        <RxDividerVertical />
                        Login: {dateFormat.format(new Date(loggedAtNum)) + 'hrs'}
                        <RxDividerVertical />
                        Logout:{' '}
                        {StillLoggedIn
                          ? 'Usuário ainda logado'
                          : dateFormat.format(new Date(loggedOutAtNum)) + 'hrs'}
                        <RxDividerVertical />
                        Tempo de uso:
                        {StillLoggedIn ? 'Calculando' : FormattedTimeDiff(loggedAt, loggedOutAt)}
                      </Author>
                    </>
                  ) : (
                    <Author className='date'>ATENÇÃO: Usuário ainda não fez login </Author>
                  )}
                </ContRowEdit>
              </Card>
            );
          })}
        </ContainerCard>
      )}
    </div>
  );
};
