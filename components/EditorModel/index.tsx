import { Component, createRef, RefObject, useRef } from 'react';
import { EditorView } from 'prosemirror-view';
import { SendOutlined, SmileOutlined, LinkOutlined, AudioOutlined, PictureOutlined } from '@ant-design/icons';
import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { nodes } from 'prosemirror-schema-basic';
import { keymap } from 'prosemirror-keymap';
import { history, redo, undo } from 'prosemirror-history';
import { Keymap, baseKeymap } from 'prosemirror-commands';
import { Step } from 'prosemirror-transform';
import 'prosemirror-view/style/prosemirror.css';
import '@scss/Modles/Editor.scss';

interface Props {
  className?: string;
  placeholder?: string;
  style?: { [key: string]: any }
}

interface State {
  editorBlank: boolean;
}

export class EditorModel extends Component<Props, State> {
  private readonly $editorDom: RefObject<HTMLDivElement>;
  private $root: EditorView | undefined;
  private readonly $schema: Schema;

  constructor(props: {}) {
    super(props);
    this.$editorDom = createRef();
    this.state = {
      editorBlank: true,
    };
    this.$schema = new Schema({ nodes, marks: {} });
  }

  get classes() {
    const classes = ['var-editor'];
    if (this.state.editorBlank) classes.push('var-editor--blank');
    if (this.props.className) classes.push(this.props.className);
    return classes.join(' ');
  }

  get getStyle() {
    return Object.assign({}, this.props.style || {});
  }

  render() {
    return <div className={this.classes} style={this.getStyle}>
      <div className="var-editor__toolbar">
        <div className="var-editor__toolbar-item"><SmileOutlined /></div>
        <div className="var-editor__toolbar-item"><PictureOutlined /></div>
        <div className="var-editor__toolbar-item"><LinkOutlined /></div>
        <div className="var-editor__toolbar-item"><AudioOutlined /></div>
        <span style={{ margin: '0 auto' }} />
        <div className="var-editor__toolbar-item"><SendOutlined /></div>
      </div>
      <div className="var-editor__content" ref={this.$editorDom} data-placeholder={this.props.placeholder} onChange={this.onChange} />
    </div>;
  }

  onChange(event: any) {
    this.setState({ editorBlank: (event as EditorState).doc.content.size === 2 });
  }

  onEnterClick() {
    console.log('onEnterClick ->>', this.getEditorRoot().dom.innerHTML);
  }

  onKeyEnter = () => {
    this.onEnterClick();
    this.rewriteEditor();
    this.getEditorRoot().focus();
    this.setState({ editorBlank: true });
    return false;
  };

  getState() {
    const KeyMaps = {
      ...baseKeymap,
      'Mod-z': undo,
      'Mod-y': redo,
      'Enter': this.onKeyEnter,
      'Shift-Enter': baseKeymap['Enter'],
    } as Keymap;
    return EditorState.create({
      schema: this.$schema,
      plugins: [keymap(KeyMaps), history()],
    });
  }

  getEditorRoot() {
    if (!this.$root) {
      this.$root = new EditorView(this.$editorDom.current as HTMLElement, {
        state: this.getState(),
        dispatchTransaction: transaction => {
          const value = this.$root?.state.apply(transaction) as EditorState;
          this.onChange(value);
          this.$root?.updateState(value);
        },
      });
    }
    return this.$root;
  }

  rewriteEditor() {
    this.getEditorRoot().destroy();
    this.$root = undefined;
    this.getEditorRoot();
  }

  componentDidMount() {
    this.getEditorRoot().focus();
  }
}
