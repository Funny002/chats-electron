import { Component } from 'react';
import { ListItem } from '@app/Team';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';

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

  render() {
    return <ChatsBoxModel className="W-chats__nav" type="left" callback={this.onCallback}>
      <div className="W-chats__nav--body" style={{ width: this.state.width + 'px' }}>
        ChatsNav {this.state.width}
      </div>
    </ChatsBoxModel>;
  }

  onCallback: ChatsBoxModelCallback = (type, value) => {
    if (type === 'down') {
      this.setState({ start: this.state.width });
    } else if (value) {
      const width = limitSize(this.state.start + value, 60, 250);
      setStorage('Chats_nav_width', width);
      this.setState({ width });
    }
  };
}
