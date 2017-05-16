import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class List extends Component {
  static propTypes = {
    isPrograms: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object),
    addProgram: PropTypes.func,
  }

  static defaultProps = {
    isPrograms: false,
    items: [],
  }

  handleClick = (name) => {
    const { isPrograms, addProgram } = this.props;

    if (isPrograms) {
      return () => {
        addProgram(name);
      };
    }

    return () => {
      this.props.fetchDataIfNeeded('department', name);
    };
  }

  render () {
    return (
      <div className={`list-wrapper ${ this.props.isPrograms ? ' is--programs' : '' }`} >
        <ul className="list">
          { this.props.items.map((item, i) => {
            return (
              <li className="list__item" key={i} >
                {!this.props.isPrograms &&
                  <i className="material-icons">keyboard_arrow_right</i>
                }
                <Link to="/programs" onClick={this.handleClick(item.name)}>{ item.name }</Link>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  fetchDataIfNeeded: PropTypes.func,
};

List.defaultProps = {
  items: [],
};
