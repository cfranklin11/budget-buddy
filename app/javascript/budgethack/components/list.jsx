import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class List extends Component {

  handleClick = (deptName) => {
    return () => {
      this.props.fetchDataIfNeeded('department', deptName);
    };
  }

  render () {
    return (
      <div className={`list-wrapper ${ this.props.isPrograms ? ' is--programs' : '' }`} >
        <ul className="list">
          { this.props.items.map((item, i) => {
            return (
              <li className="list__item" key={i} >
                <Link to="/programs" onClick={this.handleClick(item.name)}>{ item.name }</Link>
                {!this.props.isPrograms &&
                  <img className="list__item__icon" src="http://placehold.it/36x36" />
                }
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
