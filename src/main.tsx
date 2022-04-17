import React from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import '@scss/base.scss';
//
import { removeCookie } from '@utils/cookie';
import { removeStorage } from '@utils/storage';
import { csrfTokenName } from '@utils/axios';
import BrowserRouter from '@app/router';
//
removeStorage(csrfTokenName);
removeCookie('_csrf', '/');
//
React.render(
  (<ConfigProvider locale={zh_CN} space={{ size: 'small' }} componentSize="small">
    <BrowserRouter />
  </ConfigProvider>),
  document.getElementById('app'),
);
