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
    addDeliverable: () => {
      return 'The deliverable data could not be loaded';
    },
  }

  handleClick = (deliverable, addedDeliverables) => {
    const { addDeliverable } = this.props;

    return () => {
      addDeliverable(deliverable, addedDeliverables);
    };
  }

  render () {
    const { addedDeliverables, items } = this.props;

    return (
      <div className={`list-wrapper ${'is--programs'}`} >
        <ul className="list">
          { items.map((item) => {
            return (
              <li className="list__item" key={item.name} >
                <Link
                  role="link"
                  to="/programs"
                  onClick={this.handleClick(item, addedDeliverables)}>
                  { item.name }
                </Link>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}
