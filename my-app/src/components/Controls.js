import { Component } from 'react';
import UpdateArticle from './UpdateArticle';

class Controls extends Component {
  render() {
    console.log('Controls 실행');
    return (
      <ul className="controls">
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeMode('update');
            }}
          >
            update
          </a>
        </li>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangeMode('delete');
            }}
          >
            delete
          </a>
        </li>
        <li>
          <button
            onClick={() => {
              this.props.onChangeMode('create');
            }}
          >
            Create
          </button>
        </li>
      </ul>
    );
  }
}
export default Controls;
