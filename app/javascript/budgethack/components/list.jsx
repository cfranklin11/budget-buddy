import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class List extends Component {
  static propTypes = {
    isPrograms: PropTypes.bool,
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
    const { isPrograms, addProgram, fetchDataIfNeeded } = this.props;

    if (isPrograms) {
      return () => {
        addProgram(name);
      };
    }

    return () => {
      fetchDataIfNeeded('department', name);
    };
  }

  render () {
    const { isPrograms, items } = this.props;
    const divClass = classNames('list-wrapper', { 'is--programs': isPrograms });

    return (
      <div className={ divClass } >
        <ul className="list">
          { items.map((item, i) => {
            return (
              <li className="list__item" key={ item.name }>
                {!isPrograms &&
                  <i aria-hidden="true" className="material-icons">
                    keyboard_arrow_right
                  </i>
                }
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
