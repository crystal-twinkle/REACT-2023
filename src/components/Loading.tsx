import { Component, ReactElement } from 'react';
import '../assets/Loading.css';

export default class Loading extends Component {
  render(): ReactElement {
    return (
      <div className="loading">
        <div className="content">Loading...</div>
      </div>
    );
  }
}
