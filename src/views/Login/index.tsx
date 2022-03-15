import { Component, createRef, RefObject } from 'react';
import { FormInstance, Typography } from 'antd';
import '@s/Views/Login.css';
//
import { Button, Form, Input, Checkbox, Tabs } from 'antd';
import { MinusOutlined, CloseOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { ApiLogin } from '@/api/auth';

interface Props {

}

export class ViewLogin extends Component<Props> {
  private readonly data: { [key: string]: string };
  private readonly formRef: RefObject<FormInstance>;

  constructor(props: Props) {
    super(props);
    this.data = {};
    this.formRef = createRef();
  }

  handleClick(type: 'mini' | 'quit'): void {
    console.log(type);
  }

  render() {
    return (<div className="app-sign">
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
      <div className="app-sign__body">
        <Tabs>
          <Tabs.TabPane tab="登录" key="in" />
          {/*<Tabs.TabPane tab="注册" key="up" />*/}
        </Tabs>
        <Form ref={this.formRef}>
          <Form.Item name="username" style={{ marginBottom: '10px' }}>
            <Input allowClear placeholder="账号/邮箱" prefix={<UserOutlined />} onChange={e => this.handleInputChange('user', e.target.value)} />
          </Form.Item>
          <Form.Item name="password" style={{ marginBottom: '10px' }}>
            <Input.Password allowClear placeholder="密码" prefix={<LockOutlined />} onChange={e => this.handleInputChange('pass', e.target.value)} />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Checkbox>自动登录</Checkbox>
            <Checkbox>记住密码</Checkbox>
            {/*<Typography.Text>忘记密码</Typography.Text>*/}
          </div>
          <Button type="primary" block onClick={this.singInClick}>登录</Button>
        </Form>
      </div>
    </div>);
  }

  handleInputChange = (key: string, value: string) => {
    this.data[key] = value;
  };

  singUpClick() {
    console.log('sign up');
  }

  singInClick = () => {
    const { user = '', pass = '' } = this.data;
    ApiLogin(user, pass).then(res => {
      console.log(res);
    });
    // this.formRef.current?.resetFields()
  };
}