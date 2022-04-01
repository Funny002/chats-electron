import { useOutletContext } from 'react-router-dom';
import { Component } from 'react';
import '@scss/Views/Chats.scss';
import { Avatar, Button, Empty } from 'antd';
import { ListItem } from '@app/Team';
import { ChatsNav } from '@app/Chats/chatsNav';
import { ChatsEditor } from '@app/Chats/chatsEditor';

interface State {
  chatsList: ListItem[];
}

interface Props {
  onIconClick: (value: string) => void
}

export const Chats = function() {
  const context = useOutletContext() as Props;
  return <ChatsView onIconClick={context.onIconClick} />;
};

export class ChatsView extends Component<Props, State> {
  private readonly onIconClick: (key: string) => void;

  constructor(props: Props) {
    super(props);

    this.onIconClick = props.onIconClick;

    this.state = {
      chatsList: [
        { uuid: 'string - 1', name: 'name - 1', date: 'date - 1', avatar: 'avatar - 1', message: 'message - 1' },
        { uuid: 'string - 2', name: 'name - 2', date: 'date - 2', avatar: 'avatar - 2', message: 'message - 2' },
      ],
    };

  }

  onChatsItemClick = (uuid: string) => {
    console.log('onItemListClick ->>', uuid);
  };

  onEditorChange = () => {

  };

  render() {
    if (!this.state.chatsList.length) {
      return <div className="W-chats" style={{ alignItems: 'center', justifyContent: 'center', userSelect: 'none' }}>
        <Empty description={<span>暂无聊天记录，快去和 <Button type="link" onClick={() => this.onIconClick('team')}>[好友/群/组]</Button> 聊天吧！！！</span>} />
      </div>;
    }
    return <div className="W-chats">
      {this.state.chatsList.length > 1 && <ChatsNav data={this.state.chatsList} callback={this.onChatsItemClick} />}
      <div className="W-chats__body">
        <div className="W-chats__header">
          <div className="W-chats__header--avatar">
            <Avatar size={40} />
            <div className="W-chats__header--text">
              <div className="W-chats__header--title">Title</div>
              <div className="W-chats__header--note">Note</div>
            </div>
          </div>
        </div>
        <div className="W-chats__content">W-W-chats__content</div>
        <ChatsEditor callback={this.onEditorChange} />
      </div>
      <div className="W-chats__drawer">W-chats__body--drawer</div>
    </div>;
  }
}
