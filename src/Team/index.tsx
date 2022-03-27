import { Component } from 'react';
import '@scss/Views/Team.scss';
import { setBoxSize } from '@utils/tools';
import { Avatar, Button, Collapse, Empty, Input, AutoComplete, List, Tabs } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface ListItem {
  name: string;
  date: string;
  sort?: number;
  note?: string;
  avatar: string;
  message: string;
}

interface ListGroup {
  tag: string;
  has: string;
  sort?: number;
  childList: ListItem []
}

interface State {
  users: ListGroup[],
  group: ListGroup[]
}

interface CollapseListProps {
  data: ListGroup[]
  loading?: boolean;
  defaultActiveKey?: string[]
}

export class Team extends Component
  <{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [{
        tag: '测试分组 - 1',
        has: 'asdasczx',
        sort: 2,
        childList: [
          { name: '好友 1', date: '2024/12/5', avatar: '', message: '个性说明。' },
          { name: '好友 2', date: '2024/12/6', avatar: '', message: '个性说明。' },
        ],
      }, {
        tag: '测试分组 - 2',
        has: 'asdasx',
        sort: 1,
        childList: [
          { name: '好友 1', note: '备注', date: '2024/12/5', avatar: '', message: '个性说明。' },
          { name: '好友 2', note: '备注 - 2', date: '2024/12/6', avatar: '', message: '个性说明。' },
        ],
      }, {
        tag: '默认分组',
        has: 'default',
        sort: 0,
        childList: [],
      }],
      group: [{
        tag: '我置顶的',
        has: 'affix',
        childList: [],
      }, {
        tag: '我创建的',
        has: 'create',
        childList: [],
      }, {
        tag: '我管理的',
        has: 'manage',
        childList: [],
      }],
    };
    setBoxSize({ width: '300px', height: '80vh' });
  }

  createUser = (list: ListItem[]) => {
    const createUser = (User: ListItem) => <List.Item>
      {JSON.stringify(User)}
    </List.Item>;
    return <List dataSource={list} renderItem={createUser} />;
  };

  render() {
    return <div className="W-team">
      <div className="W-team__header">
        <Input.Group style={{ paddingLeft: '10px' }}>
          <AutoComplete notFoundContent={
            <Empty style={{ marginTop: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
          } defaultOpen allowClear style={{ width: 'calc(100% - 30px)' }}>
            <Input size="middle" prefix={<SearchOutlined />} placeholder="好友/群/组" />
          </AutoComplete>
          <Button type="text"><PlusOutlined /></Button>
        </Input.Group>
      </div>
      <div className="W-team__body">
        <Tabs defaultActiveKey="user" animated centered>
          <Tabs.TabPane tab="好友" key="user">
            <CollapseList data={this.state.users} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="群/组" key="group">
            <CollapseList data={this.state.group} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>;
  }
}

export const CollapseList = (props: CollapseListProps) => {
  const data = props.data.sort((a, b) => (a.sort || 0) - (b.sort || 0));
  return !data.length ?
    <Empty style={{ marginTop: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
    : <Collapse defaultActiveKey={props.defaultActiveKey} expandIconPosition={'right'} ghost>{
      data.map(function(Tag) {
        return <Collapse.Panel key={Tag.has} header={Tag.tag}>
          <List loading={props.loading} dataSource={Tag.childList} renderItem={function(User) {
            return <List.Item className="user-list">
              <Avatar className="user-list__avatar" size={40} />
              <div className="user-list__body">
                <div className="user-list__title">
                  <span className="user-list__name">{User.note || User.name}</span>
                  <span className="user-list__date">{User.date}</span>
                </div>
                <div className="user-list__message">{User.message}</div>
              </div>
            </List.Item>;
          }} />
        </Collapse.Panel>;
      })
    }</Collapse>;
};
