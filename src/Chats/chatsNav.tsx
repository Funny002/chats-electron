import { Component } from 'react';
import { ListItem } from '@app/Team';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';
import { Avatar, List } from 'antd';

interface Props {
  data: ListItem[];
  className?: string;

  callback(value: string): void;
}

interface State {
  width: number;
  start: number;
}

export class ChatsNav extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      start: 0,
      width: getStorage('Chats_nav_width') || 250,
    };
  }

  get classes() {
    const classes = ['W-chats__nav--body'];
    if (this.state.width <= 180) classes.push('is-date');
    if (this.state.width <= 150) classes.push('is-message');
    if (this.state.width <= 80) classes.push('is-avatar');
    return classes.join(' ');
  }

  render() {
    return <ChatsBoxModel className="W-chats__nav" type="left" callback={this.onCallback}>
      <div className={this.classes} style={{ width: this.state.width + 'px' }}>
        <List dataSource={this.props.data} renderItem={Item => {
          return <List.Item className="W-chats__nav--item">
            <Avatar className="W-chats__nav--avatar" size={40} />
            <div className="W-chats__nav--box">
              <div className="W-chats__nav--title">
                <span className="W-chats__nav--name">{Item.name}</span>
                <span className="W-chats__nav--date">{Item.date}</span>
              </div>
              <div className="W-chats__nav--message">{Item.message}</div>
            </div>
          </List.Item>;
        }} />
      </div>
    </ChatsBoxModel>;
  }

  onCallback: ChatsBoxModelCallback = (type, value) => {
    if (type === 'down') {
      this.setState({ start: this.state.width });
    } else if (value) {
      const width = limitSize(this.state.start + value, 60, 200);
      setStorage('Chats_nav_width', width);
      this.setState({ width });
    }
  };
}
