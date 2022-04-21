import { Component, createRef, RefObject } from 'react';
import { setBoxSize } from '@utils/tools';
import '@scss/Views/Sign.scss';
import { Button, Checkbox, Form, FormInstance, Input, Tabs, Typography, ConfigProvider, message } from 'antd';
import { MailOutlined, LockOutlined, KeyOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ApiLogin, ApiRegister, ApiSendEmail } from '@api/auth';
import { getStorage, removeStorage, setStorage } from '@utils/storage';

interface State {
  memory: boolean;
  tabs: 'in' | 'up';
  authSign: boolean;
  codeLoading: number
}

interface FormData {
  pass: string;
  email: string;
  code?: string;
}

const onSetUserInfo = (data: any, email?: string, pass?: string, memory?: boolean, authSign?: boolean) => {
  setStorage('user-info', data.info);
  setStorage('user-token', data.token);
  if (memory) setStorage('sign-memory', { email, pass, authSign }, undefined, true);
  //
  location.reload();
};

export class Sign extends Component<{}, State> {
  private readonly formRef: RefObject<FormInstance>;

  constructor(props: {}) {
    super(props);
    this.state = {
      tabs: 'in',
      memory: false,
      codeLoading: 0,
      authSign: false,
    };
    this.formRef = createRef<FormInstance>();
    setBoxSize({ width: '400px', height: '320px' });
  }

  onTabsChange = (key: string) => {
    this.formRef.current?.resetFields();
    this.setState({ tabs: key as 'in' | 'up', memory: false, authSign: false });
  };

  get formData(): FormData | {} {
    return this.formRef.current?.getFieldsValue() || {};
  }

  get CodeText() {
    const count = this.state.codeLoading;
    return (count !== 0 ? `(${count}) ` : '') + '获取验证码';
  }

  handleClick = (types: 'quit' | 'mini') => {
    console.log('types ->>', types);
  };

  render() {
    return <ConfigProvider componentSize="middle">
      <div className="app-sign">

        <div className="app-sign__header">
          <div className="app-sign__header-logo">
            <div className="app-sign__header-image">
              <img src="/favicon.png" alt="Logo" />
            </div>
            <Typography.Title className="app-sign__header-title" level={5}>Chats</Typography.Title>
          </div>
          <div style={{ margin: '0 auto' }} />
          <div className="ant-btn-group" id="app-nav-btn">
            <Button onClick={() => this.handleClick('mini')}><MinusOutlined /></Button>
            <Button onClick={() => this.handleClick('quit')} className="quit-btn"><CloseOutlined /></Button>
          </div>
        </div>

        <Tabs defaultValue={this.state.tabs} centered onTabClick={this.onTabsChange}>
          <Tabs.TabPane tab="登录" key="in" />
          <Tabs.TabPane tab="注册" key="up" />
        </Tabs>

        <Form className="app-sign__body" ref={this.formRef}>
          <Form.Item name="email" rules={[{ required: true, message: '邮箱格式错误', pattern: /^\w+@\w+\.\w+$/ }]}>
            <Input placeholder="邮箱" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="pass" rules={[{ required: true, message: '密码格式错误', pattern: /^\w{6}\w+$/ }]}>
            <Input.Password placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>
          {this.state.tabs === 'up' ?
            <Form.Item name="code">
              <Input.Search placeholder="验证码" loading={this.state.codeLoading !== 0} prefix={<KeyOutlined />} enterButton={this.CodeText} onSearch={this.getCodeButton} />
            </Form.Item>
            : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Checkbox name="memory" checked={this.state.memory} onChange={this.onCheckboxChange}>记住密码</Checkbox>
              <Checkbox name="authSign" checked={this.state.authSign} onChange={this.onCheckboxChange}>自动登录</Checkbox>
              <Button type="text" onClick={this.onRePass}>忘记密码</Button>
            </div>
          }
          <Button onClick={this.onSignButton} type="primary" block>{this.state.tabs === 'in' ? '登录' : '注册'}</Button>
        </Form>
      </div>
    </ConfigProvider>;
  }

  componentDidMount() {
    const signMemory = getStorage('sign-memory');
    if (signMemory) {
      const { authSign, email, pass } = signMemory;
      this.setState({ authSign, memory: true });
      this.formRef.current?.setFieldsValue({ email, pass });
      if (authSign) this.onAuthSign();
    }
  }

  onAuthSign() {
    console.log('onAuthSign ->>');
  }

  onRePass = () => {
    message.warn('正在施工中...');
  };

  onCheckboxChange = (event: CheckboxChangeEvent) => {
    const { name, checked } = event.target;
    if (name === 'authSign' && checked) {
      this.setState({ memory: true });
    } else if (name === 'memory' && !checked) {
      this.setState({ authSign: false });
    }
    this.setState({ [name as string]: checked } as { [key in 'memory' | 'authSign']: boolean });
  };

  onCodeText() {
    setTimeout(() => {
      this.setState({ codeLoading: this.state.codeLoading - 1 });
      if (this.state.codeLoading > 0) {
        this.onCodeText();
      }
    }, 1000);
  }

  getCodeButton = () => {
    this.formRef.current?.validateFields(['email']).then(({ email }) => {
      ApiSendEmail(email).then(({ data: res }) => {
        if (res.code === 0) {
          this.setState({ codeLoading: 60 });
          message.success('邮件发送成功。');
        } else {
          this.setState({ codeLoading: 30 });
          message.error(res.msg);
        }
        this.onCodeText();
      });
    });
  };

  onSignIn(email: string, pass: string) {
    const { memory, authSign } = this.state;
    ApiLogin(email, pass).then(({ data: res }) => {
      if (res.code === 0) {
        onSetUserInfo(res.data, email, pass, memory, authSign);
      } else {
        message.error(res.msg);
      }
    });
  };

  onSignButton = () => {
    this.formRef.current?.validateFields().then(({ email, pass, code }) => {
      if (this.state.tabs === 'in') return this.onSignIn(email, pass);
      ApiRegister(email, pass, code).then(({ data: res }) => {
        if (res.code === 0) {
          onSetUserInfo(res.data);
        } else {
          message.error(res.msg);
        }
      });
    });
  };
}
