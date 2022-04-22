import { useEffect, useState } from 'react';
import { useRoutes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { getStorage, removeStorage, setStorage } from '@utils/storage';
import { ApiHasToken } from '@api/auth';
import { HomeNav } from '@app/HomeNav';
import { Setting } from '@app/Setting';
import { Chats } from '@app/Chats';
import { Sign } from '@app/Sign';
import { Home } from '@app/Home';
import { Team } from '@app/Team';
import { User } from '@app/User';

function BeforeRoutes() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState(false);

  useEffect(() => {
    const token = getStorage('user-token');

    if (!token) setState(false);

    if (!state) {
      if ('/login' !== pathname) {
        if (token) {
          (async function() {
            try {
              const { data: { data } } = await ApiHasToken(token);
              if (!data) {
                removeStorage('user-info', 'user-token');

                navigate({ pathname: '/login' });
              } else {
                setState(true);
              }
            } catch (e: any) {
              if (e.response.status === 401) {
                removeStorage('user-info', 'user-token');

                navigate({ pathname: '/login' });
              }
            }
          })();
        } else {
          navigate({ pathname: '/login' });
        }
      } else if (token) {
        navigate({ pathname: '/home' });
      }
    }
  });

  return useRoutes([{
    path: '/',
    element: <HomeNav />,
    children: [
      { path: 'user', element: <User /> },
      { path: 'home', element: <Home /> },
      { path: 'team', element: <Team /> },
      { path: 'chats', element: <Chats /> },
      { path: 'setting', element: <Setting /> },
    ],
  }, { path: '/login', element: <Sign /> }]);
}

export default function() {
  return <BrowserRouter>
    <BeforeRoutes />
  </BrowserRouter>;
}
