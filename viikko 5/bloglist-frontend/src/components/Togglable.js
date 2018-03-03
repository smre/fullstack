import React from 'react';

export default class Togglable extends React.Component {
  toggleVisibility = () => {
    this.setState({visible: !this.state.visible});
  };

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render () {
    const hideWhenVisible = {display: this.state.visible ? 'none' : ''};
    const showWhenVisible = {display: this.state.visible ? '' : 'none'};

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    );
  }
}
