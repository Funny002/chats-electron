import { Component, RefObject, createRef } from 'react';
import { ChatsBoxModel, ChatsBoxModelCallback } from '@module/ChatsBoxModel';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';

declare module 'quill' {
  interface Quill {
    history: {
      clear(): void;

      undo(): void;

      redo(): void;

      cutoff(): void;
    };
  }
}

interface Props {
  callback(): void
}

interface State {
  height: number;
  start: number;
}

export class ChatsEditor extends Component<Props, State> {
  private readonly editorRef: RefObject<HTMLDivElement>;
  private quillRef?: Quill;

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
      <div className="W-chats__editor--body" style={{ height: this.state.height + 'px' }}>
        <div className="W-chats__editor--menu">
        </div>
        <div className="W-chats__editor--context" ref={this.editorRef} />
      </div>
    </ChatsBoxModel>;
  }

  onKeyPress = (event: any) => {
    console.log(event);
  };

  onMessageSend = () => {
    console.log('onMessageSend ->>', this.quillRef?.getContents());
    this.quillRef?.history.clear();
  };

  componentDidMount() {
    /** 初始化
     * font-family: Helvetica, Arial, sans-serif
     */
    this.quillRef = new Quill(this.editorRef.current as HTMLDivElement, {
      placeholder: 'Enter to send. Shift + Enter to add new line',
    });
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
