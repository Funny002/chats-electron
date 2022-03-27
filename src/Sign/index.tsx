import { Component, createRef, RefObject } from 'react';
import { setBoxSize } from '@utils/tools';
import '@scss/Views/Sign.scss';
import { Button, Checkbox, Form, FormInstance, Input, Tabs, Typography, ConfigProvider } from 'antd';
import { MailOutlined, LockOutlined, KeyOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface State {
  memory: boolean;
  tabs: 'in' | 'up';
  authSign: boolean;
  codeLoading: boolean
}

interface FormData {
  pass: string;
  email: string;
  code?: string;
}

export class Sign extends Component<{}, State> {
  private readonly formRef: RefObject<FormInstance>;

  constructor(props: {}) {
    super(props);
    this.state = {
      tabs: 'in',
      memory: false,
      authSign: false,
      codeLoading: false,
    };
    this.formRef = createRef<FormInstance>();
    setBoxSize({ width: '400px', height: '320px' });
  }

  onTabsChange = (key: string) => this.setState({ tabs: key as 'in' | 'up' });

  get formData(): FormData | {} {
    return this.formRef.current?.getFieldsValue() || {};
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
          <Form.Item name="email">
            <Input placeholder="邮箱" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item name="pass">
            <Input.Password placeholder="密码" prefix={<LockOutlined />} />
          </Form.Item>
          {this.state.tabs === 'up' ?
            <Form.Item name="code">
              <Input.Search placeholder="验证码" prefix={<KeyOutlined />} enterButton="获取验证码" onSearch={this.getCodeButton} />
            </Form.Item>
            : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Checkbox name="memory" checked={this.state.memory} onChange={this.onCheckboxChange}>记住密码</Checkbox>
              <Checkbox name="authSign" checked={this.state.authSign} onChange={this.onCheckboxChange}>自动登录</Checkbox>
              <Button type="text">忘记密码</Button>
            </div>
          }
          <Button onClick={this.onSignButton} type="primary" block>{this.state.tabs === 'in' ? '登录' : '注册'}</Button>
        </Form>
      </div>
    </ConfigProvider>;
  }

  onCheckboxChange = (event: CheckboxChangeEvent) => {
    const { name, checked } = event.target;
    if (name === 'authSign' && checked) {
      this.setState({ memory: true });
    } else if (name === 'memory' && !checked) {
      this.setState({ authSign: false });
    }
    this.setState({ [name as string]: checked } as { [key in 'memory' | 'authSign']: boolean });
  };

  getCodeButton = () => {
    console.log('sign -> getCodeButton');
  };

  onSignButton = () => {
    console.log('sign -> onSignButton');
  };
}
