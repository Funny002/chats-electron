import { Component, createElement } from 'react';
import { ChatsBoxModelLine } from '@module/ChatsBoxModel/line';

interface Props {
  className?: string;
  lineClassName?: string;
  type: 'top' | 'right' | 'button' | 'left';

  callback(value: number): void;
}

export class ChatsBoxModel extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  get classes() {
    return ['M-chatsBox', 'M-chatsBox--' + this.props.type, this.props.className].join(' ');
  }

  render() {
    return <div className={this.classes}>
      {this.getHtmlDom()}
    </div>;
  }

  getHtmlDom() {
    const chatsBoxModelLine = createElement(ChatsBoxModelLine, { className: this.props.lineClassName, keys: this.props.type, callback: this.props.callback });
    const children = createElement('div', { className: 'M-chatsBox__content' }, this.props.children);
    switch (this.props.type) {
      case 'top':
      case 'left':
        return [children, chatsBoxModelLine];
      case 'right':
      case 'button':
        return [chatsBoxModelLine, children];
      default:
        return undefined;
    }
  }
}
