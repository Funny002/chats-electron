import { setBoxSize } from '@utils/tools';
import '@scss/Views/HomeNav.scss';
import { LoginOutlined, GithubOutlined, UserOutlined, HomeOutlined, CommentOutlined, SlidersOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const listData: { [key: string]: any } = {
  home: HomeOutlined,
  team: TeamOutlined,
  chats: CommentOutlined,
  setting: SlidersOutlined,
};

export const HomeNav = () => {
  setBoxSize({ width: '80vw', height: '80vh' });

  const routerPush = useNavigate();

  const [state, setState] = useState({
    iconName: location.pathname.slice(1) || 'home',
  });

  const onIconClick = (key: string) => {
    if (state.iconName !== key) {
      routerPush(`/${key}`, { replace: true });
      setState({ iconName: key });
    }
  };

  const onLogout = () => {
    console.log('onLogout');
  };

  const onJumpClick = () => {
    console.log('onJumpClick');
  };

  return <div className="app-home">
    <div className="app-home__nav">

      <div onClick={() => onIconClick('user')} style={{ cursor: 'pointer' }}>
        <Avatar className="app-home__nav-avatar" size={40} icon={<UserOutlined />} />
      </div>

      <div style={{ width: '100%', margin: '50px auto auto' }}>
        {Object.keys(listData).map(key => {
          return (<div
            key={key}
            onClick={() => onIconClick(key)}
            className={'app-home__nav-item' + (state.iconName === key ? ' active' : '')}
          >{listData[key].render()}</div>);
        })}
        <div className="app-home__nav-item" onClick={onJumpClick}><GithubOutlined /></div>
      </div>
      <div className="app-home__nav-item" onClick={onLogout}><LoginOutlined /></div>
    </div>

    <div className="app-home__body">
      <Outlet context={{ onIconClick }} />
    </div>

  </div>;
};
