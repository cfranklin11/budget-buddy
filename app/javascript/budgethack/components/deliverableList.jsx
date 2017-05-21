import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div className={ `list-wrapper ${'is--programs'}` } >
        <ul className="list">
          { items.map((item) => {
            return (
              <li className="list__item" key={ item.id }>
                <button onClick={ this.handleClick(item, addedDeliverables) }>
                  { item.name }
                </button>
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}
