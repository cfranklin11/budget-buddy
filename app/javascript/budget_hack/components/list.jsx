import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class List extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    addProgram: PropTypes.func,
    fetchDataIfNeeded: PropTypes.func,
  }

  static defaultProps = {
    isPrograms: false,
    items: [],
    addProgram: () => { return 'Could not add the program'; },
    fetchDataIfNeeded: () => { return 'Unable to check data'; },
  }

  handleClick = (name) => {
    const { addProgram, fetchDataIfNeeded } = this.props;
    return () => {
      addProgram(name);
    };
  }

  render () {
    const { items } = this.props;

    return (
      <div className="list-wrapper is--programs" >
        <ul className="list">
          { items.map((item) => {
            return (
              <li className="list__item" key={ item.id }>
                <button
                  aria-label={ item.name }
                  onClick={ this.handleClick(item.name) }>
                  { item.name }
                </button>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}
