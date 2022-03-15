import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import { ViewLogin } from '@v/Login';
import { ViewHome } from '@v/Home';
import 'antd/dist/antd.css';
import '@s/base.css';

ReactDom.render(
  (<BrowserRouter>
    <Routes>
      <Route path="/login" element={<ViewLogin />} />
      <Route path="/" element={<ViewHome />} />
    </Routes>
  </BrowserRouter>),
  document.getElementById('root'),
);
