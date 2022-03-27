import { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return <div>
      Home <Link to={'/chats'} />
    </div>;
  }
}
