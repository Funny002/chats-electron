import { Component, createElement } from 'react';
import { ChatsBoxModelLine } from '@module/ChatsBoxModel/line';
import '@scss/Modles/ChatsBox.scss';

interface Props {
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
    return ['M-chatsBox', 'M-chatsBox--' + this.props.type, this.props.className].join(' ');
  }

  render() {
    const chatsBoxModelLine = <ChatsBoxModelLine keys={this.props.type} key="chatsBoxModelLine" callback={this.props.callback} className={this.props.lineClassName} />;
    const childList = [this.props.children, chatsBoxModelLine];
    return <div className={this.classes}>
      {this.typeState ? childList : [childList[1], childList[0]]}
    </div>;
  }
}
