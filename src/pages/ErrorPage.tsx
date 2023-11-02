import React, { Component } from 'react';
import '../assets/ErrorPage.css';

interface Props {
  isErrorChange: (arg: boolean) => void;
}

interface State {
  hasError: boolean;
}

export default class ErrorPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  change = () => {
    this.props.isErrorChange(this.state.hasError);
  };

  render() {
    return (
      <div className="error-wrap">
        <div className="error__text">OOPS, something went wrong (((</div>
        <button className="button-21" onClick={this.change}>
          Reset
        </button>
      </div>
    );
  }
}
