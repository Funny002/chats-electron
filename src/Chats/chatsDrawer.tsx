import { Component } from 'react';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';
import { AutoComplete, Avatar, Empty, Input, List, Typography } from 'antd';
import { TeamOutlined, UserAddOutlined } from '@ant-design/icons';

interface Props {
  // callback(): void
}

interface State {
  width: number;
  start: number;
}

export class ChatsDrawer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      start: 0,
      width: getStorage('Chats_drawer_width') || 180,
    };
  }

  render() {
    return <ChatsBoxModel className="W-chats__drawer" type="right" callback={this.onCallback} disabled>
      <div className="W-chats__drawer--body" style={{ width: this.state.width + 'px' }}>
        <div className="W-chats__drawer--box">
          <Avatar size={80} shape="square" />
          <div className="W-chats__drawer--title">Title</div>
          <Typography.Paragraph className="W-chats__drawer--note" ellipsis={{ rows: 2 }}>Note</Typography.Paragraph>
        </div>
        <div className="W-chats__drawer--header">文件</div>
        <List renderItem={Item => {
          return <List.Item>Item</List.Item>;
        }} />
        <div className="W-chats__drawer--header" style={{ display: 'flex', alignItems: 'center' }}>
          成员<span>1/100</span>
          <UserAddOutlined className="btn" />
        </div>
        <AutoComplete notFoundContent={
          <Empty style={{ marginTop: '20px' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        } allowClear style={{ padding: '5px' }}>
          <Input.Search />
        </AutoComplete>
        <List
          className="W-chats__drawer--users"
          dataSource={[...Array(20)].map((v, k) => k + 1)}
          renderItem={Item => {
            return <List.Item className="W-chats__drawer--list">
              <Avatar className="W-chats__drawer--avatar" size={20} />
              <div className="W-chats__drawer--name">User {Item}</div>
              <span style={{ margin: '0 auto' }} />
              {Item <= 2 && <TeamOutlined className="W-chats__drawer--icon" />}
            </List.Item>;
          }} />
      </div>
    </ChatsBoxModel>;
  }

  onCallback: ChatsBoxModelCallback = (type, value) => {
    if (type === 'down') {
      this.setState({ start: this.state.width });
    } else if (value) {
      const width = limitSize(this.state.start + value, 160, 200);
      setStorage('Chats_drawer_width', width);
      this.setState({ width });
    }
  };
}
