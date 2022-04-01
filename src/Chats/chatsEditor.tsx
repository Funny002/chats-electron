import { Component } from 'react';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';

interface Props {
  callback(): void
}

interface State {
  height: number;
  start: number

}

export class ChatsEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      start: 0,
      height: getStorage('Chats_nav_height') || 125,
    };
  }

  render() {
    return <ChatsBoxModel className="W-chats__editor" type="button" callback={this.onCallback}>
      <div className="W-chats__editor--body" style={{ height: this.state.height + 'px' }}>
        ChatsEditor {this.state.height}
      </div>
    </ChatsBoxModel>;
  }

  onCallback: ChatsBoxModelCallback = (type, value) => {
    if (type === 'down') {
      this.setState({ start: this.state.height });
    } else if (value) {
      const height = limitSize(this.state.start + value, 100, 300);
      setStorage('Chats_nav_height', height);
      this.setState({ height });
    }
  };
}
