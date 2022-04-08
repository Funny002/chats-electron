import { Component, RefObject, createRef } from 'react';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';
import { EditorModel } from '@module/EditorModel';

interface Props {
  callback(): void
}

interface State {
  height: number;
  start: number;
}

export class ChatsEditor extends Component<Props, State> {
  private readonly editorRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      start: 0,
      height: getStorage('Chats_nav_height') || 125,
    };
    this.editorRef = createRef();
  }

  render() {
    return <ChatsBoxModel className="W-chats__editor" type="button" callback={this.onCallback}>
      <EditorModel style={{ height: this.state.height + 'px' }} placeholder="Enter to send. Shift + Enter to add new line" />
    </ChatsBoxModel>;
  }

  onKeyPress = (event: any) => {
    console.log(event);
  };

  onMessageSend = () => {
  };

  componentDidMount() {
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
