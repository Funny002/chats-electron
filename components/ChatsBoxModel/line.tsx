import { Component } from 'react';
import { ChatsBoxModelCallback } from './index';
import { HolderOutlined } from '@ant-design/icons';

interface Props {
  className?: string;
  keys: 'top' | 'right' | 'button' | 'left';

  callback: ChatsBoxModelCallback
}

interface State {
  showLine: boolean
}

export class ChatsBoxModelLine extends Component<Props, State> {
  private readonly keys: 'pageX' | 'pageY';

  private list: {
    cancel(): void;
    move?(event: MouseEvent): void;
  };

  constructor(props: Props) {
    super(props);

    this.state = { showLine: false };
    this.keys = ['top', 'button'].includes(props.keys) ? 'pageY' : 'pageX';

    this.list = {
      move: undefined,
      cancel: () => {
        if (this.list.move) {
          window.removeEventListener('mousemove', this.list.move);
          this.setState({ showLine: false });
          this.props.callback('up');
          this.list.move = undefined;
        }
      },
    };

    window.addEventListener('mouseup', this.list.cancel);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.list.cancel);
  }

  get getIconStyle() {
    return this.keys === 'pageY' ? { transform: 'translate(-50%, -50%) rotate(90deg)' } : undefined;
  }

  get getStyle() {
    if (this.state.showLine) {
      return { [this.keys === 'pageY' ? 'height' : 'width']: '10px' };
    }
    return undefined;
  }

  get classes() {
    return ['M-chatsBox__line', this.keys, this.props.className].join(' ');
  }

  render() {
    return <div className={this.classes} style={this.getStyle} onMouseDown={this.onStartMove}>
      <HolderOutlined style={this.getIconStyle} />
    </div>;
  }

  boxFunc = (state: boolean) => (start: number, value: number) => {
    if (state) return value - start;
    return start - value;
  };

  onStartMove = (downEvent: any) => {
    const start = downEvent[this.keys];
    this.setState({ showLine: true });
    this.props.callback('down', start);
    const boxFunc = this.boxFunc(['top', 'left'].includes(this.props.keys));
    this.list.move = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault(); // 过滤选中文字
      this.props.callback('move', boxFunc(start, moveEvent[this.keys]));
    };
    window.addEventListener('mousemove', this.list.move);
  };
}
