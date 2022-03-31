import { Component } from 'react';
import { ListItem } from '@app/Team';
import { getStorage, setStorage } from '@utils/storage';
import { limitSize } from '@utils/tools';
import { List } from 'antd';
import { HolderOutlined } from '@ant-design/icons';

interface Props {
  index?: string;
  data?: ListItem[];
  callback: (value: string) => void;
}

interface State {
  uuid: string;
  boxWidth: number;
  lineHover: boolean;
}

export class ChatsNav extends Component<Props, State> {
  private line: {
    move?(event: MouseEvent): void
    free(): void
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      lineHover: false,
      uuid: props.index || '',
      boxWidth: getStorage('chats-box-width') || 250,
    };

    this.line = {
      move: undefined,
      free: () => {
        if (this.line.move) {
          window.removeEventListener('mousemove', this.line.move);
          this.setState({ lineHover: false });
          this.line.move = undefined;
        }
      },
    };

    window.addEventListener('mouseup', this.line.free);
  }

  lineMouseDown = (event: any) => {
    const start = event.pageX;
    const boxLeft = this.state.boxWidth;
    const func = (value: number) => {
      const boxSize = limitSize(boxLeft + (value - start), 60, 250);
      setStorage('chats-box-width', boxSize); // 设置缓存
      return boxSize;
    };
    this.setState({ lineHover: true });
    this.line.move = (event: MouseEvent) => {
      event.preventDefault(); // 过滤选中文字
      this.setState({ boxWidth: func(event.pageX) });
    };
    window.addEventListener('mousemove', this.line.move);
  };

  render() {
    return [
      <div key="W-chats__nav" className="W-chats__nav" style={{ width: this.state.boxWidth + 'px' }}>
        <List dataSource={this.props?.data || []} renderItem={item => {
          return <List.Item>{JSON.stringify(item)}</List.Item>;
        }} />
      </div>,
      <div key="W-chats__nav-line"
           className="W-chats__nav-line"
           onMouseDown={this.lineMouseDown}
           style={this.state.lineHover ? { width: '10px' } : undefined}>
        <HolderOutlined />
      </div>,
    ];
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.line.free);
  }
}
