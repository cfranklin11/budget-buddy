import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class DeliverableList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    addDeliverable: PropTypes.func,
    addedDeliverables: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    items: [],
    addedDeliverables: [],
  }

  handleClick = (deliverable, addedDeliverables) => {
    return () => {
      this.props.addDeliverable(deliverable, addedDeliverables);
    };
  }

  render () {
    const { addedDeliverables, items } = this.props;

    return (
      <div className={`list-wrapper ${'is--programs'}`} >
        <ul className="list">
          { items.map((item, i) => {
            return (
              <li className="list__item" key={i} >
                <Link to="/programs" onClick={this.handleClick(item, addedDeliverables)}>{ item.name }</Link>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}
