import { Component } from 'react';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';

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
      width: getStorage('Chats_drawer_width') || 125,
    };
  }

  render() {
    return <ChatsBoxModel className="W-chats__drawer" type="right" callback={this.onCallback}>
      <div className="W-chats__drawer--body" style={{ width: this.state.width + 'px' }}>
        ChatsDrawer {this.state.width}
      </div>
    </ChatsBoxModel>;
  }

  onCallback: ChatsBoxModelCallback = (type, value) => {
    if (type === 'down') {
      this.setState({ start: this.state.width });
    } else if (value) {
      const width = limitSize(this.state.start + value, 150, 200);
      setStorage('Chats_drawer_width', width);
      this.setState({ width });
    }
  };
}
