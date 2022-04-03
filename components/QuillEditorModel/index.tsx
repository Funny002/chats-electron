import { Component } from 'react';
import 'quill/dist/quill.bubble.css';
import Quill from 'quill';

interface Props {
  placeholder?: string;
  debug?: 'error' | 'warn' | 'info' | boolean;
}

export class QuillEditorModel extends Component<Props> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return undefined;
  }

  componentDidMount() {
    // this.quillRef = new Quill(this.editorRef.current as HTMLDivElement, {
    //   placeholder: 'Enter to send. Shift + Enter to add new line',
    //   debug: 'info',
    //   bounds:
    // });
  }

  componentWillUnmount() {

  }
}
