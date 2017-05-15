import React, { PropTypes, Component } from 'react';

export default class Program extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render () {
    return (
      <h1>{ this.props.name }</h1>
    );
  }
}
