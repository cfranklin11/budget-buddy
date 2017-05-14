import React from 'react';
import { Link } from 'react-router';

class List extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="list-wrapper">
        <ul className="list">
        { this.props.items.map(
          (item, i) =>
            <li className = "list__item" key = { i } >
            <Link to="/programs">{ item.name }</Link>
            </li>
          )
        }
      </ul>
      </div>

    );
  }
}
export default List;
