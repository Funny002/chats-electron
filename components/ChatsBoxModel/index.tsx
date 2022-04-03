import { Component } from 'react';
import { ChatsBoxModelLine } from '@module/ChatsBoxModel/line';
import '@scss/Modles/ChatsBox.scss';

interface Props {
  disabled?: boolean;
  className?: string;
  lineClassName?: string;
  type: 'top' | 'right' | 'button' | 'left';

  callback: ChatsBoxModelCallback
}

export type ChatsBoxModelCallback = (type: 'down' | 'move' | 'up', value?: number) => void

export class ChatsBoxModel extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  get typeState() {
    return ['top', 'left'].includes(this.props.type);
  }

  get classes() {
    const classes = ['M-chatsBox', 'M-chatsBox--' + this.props.type, this.props.className];
    if (this.props.disabled) classes.push('M-chatsBox--disabled');
    return classes.concat(this.props.className).join(' ');
  }

  render() {
    const childList = [this.props.children, <ChatsBoxModelLine
      keys={this.props.type}
      key="chatsBoxModelLine"
      disabled={this.props.disabled}
      callback={this.props.callback}
      className={this.props.lineClassName}
    />];
    return <div className={this.classes}>
      {this.typeState ? childList : [childList[1], childList[0]]}
    </div>;
  }
}
