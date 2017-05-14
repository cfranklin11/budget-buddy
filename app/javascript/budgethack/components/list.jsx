import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class List extends Component {
  handleClick = (deptName) => {
    return () => {
      const deptLabel = deptName ? deptName.replace(/\s/g, '_').toLowerCase() : '';

      this.props.fetchDataIfNeeded('department', deptLabel);
    };
  }

  render () {
    return (
      <div className="list-wrapper">
        <ul className="list">
          { this.props.items.map(
            (item, i) =>
              <li className="list__item" key={i} >
                <Link to="/programs" onClick={this.handleClick(item.name)}>{ item.name }</Link>
              </li>,
            )
          }
        </ul>
      </div>

    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  fetchDataIfNeeded: PropTypes.func,
};

List.defaultProps = {
  items: [],
};
