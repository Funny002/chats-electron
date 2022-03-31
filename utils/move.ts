interface MoveList {
  /* cancel */
  free(): void

  /* 移动 */
  move?(event: MouseEvent): void
}

const onMouseDown = () => {

};

export class Move {
  private readonly keys: 'pageX' | 'pageY';
  private list: MoveList;

  constructor(element: HTMLElement, keys: 'pageX' | 'pageY') {
    this.bindRemove(element);
    this.keys = keys;
    this.list = {
      move: undefined,
      free: () => {
        if (this.list.move) {
          window.removeEventListener('mousemove', this.list.move);
        }
      },
    };
  }

  /** 重新处理 remove 事件 */
  bindRemove(element: HTMLElement) {
    const beforeRemove = element.remove;
    element.addEventListener('mousedown', this.mouseDown);
    element.remove = () => {
      element.removeEventListener('mousedown', this.mouseDown);
      beforeRemove();
    };
  };

  mouseDown(downEvent: MouseEvent) {
    const start = downEvent[this.keys];
    this.list.move = (moveEvent: MouseEvent) => {
      moveEvent[this.keys]
    };
  }

  use() {}

  cancel() {}
}
