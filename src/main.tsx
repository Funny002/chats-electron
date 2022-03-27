import * as Router from 'react-router-dom';
import React from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import '@scss/base.scss';
//
import { HomeNav } from '@app/HomeNav';
import { Setting } from '@app/Setting';
import { Chats } from '@app/Chats';
import { Sign } from '@app/Sign';
import { Home } from '@app/Home';
import { Team } from '@app/Team';
import { User } from '@app/User';

React.render(
  (<ConfigProvider locale={zh_CN} space={{ size: 'small' }} componentSize="small">
    <Router.BrowserRouter>
      <Router.Routes>
        <Router.Route path="/" element={<HomeNav />}>
          <Router.Route path="user" element={<User />} />
          <Router.Route path="home" element={<Home />} />
          <Router.Route path="team" element={<Team />} />
          <Router.Route path="chats" element={<Chats />} />
          <Router.Route path="setting" element={<Setting />} />
        </Router.Route>
        <Router.Route path="/login" element={<Sign />} />
      </Router.Routes>
    </Router.BrowserRouter>
  </ConfigProvider>),
  document.getElementById('app'),
);
