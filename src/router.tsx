import { useEffect, useState } from 'react';
import { useRoutes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { getStorage, removeStorage } from '@utils/storage';
import { ApiHasToken } from '@api/auth';
import { HomeNav } from '@app/HomeNav';
import { Setting } from '@app/Setting';
import { Chats } from '@app/Chats';
import { Sign } from '@app/Sign';
import { Home } from '@app/Home';
import { Team } from '@app/Team';
import { User } from '@app/User';

function BeforeRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  useEffect(() => {
    const func = async () => {
      const token = getStorage('user-token');
      if (location.pathname !== '/login') {
        if (!token) {
          navigate({ pathname: '/login' });
        } else if (!state) {
          const { data: res } = await ApiHasToken(token);
          if (!res.data) {
            removeStorage('user-info', 'user-token', 'sign-memory');
            navigate({ pathname: '/login' });
          } else {
            setState(true);
          }
        }
      } else if (token) {
        navigate({ pathname: '/home' });
      }
    };
    func();
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
