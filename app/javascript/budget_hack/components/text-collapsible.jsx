import React from 'react';
import PropTypes from 'prop-types';

class TextCollapsible extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  constructor () {
    super();
    this.state = {
      isExpanded: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle () {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  }

  render () {
    const { isExpanded } = this.state;
    const { children } = this.props;
    return (
      <div
        className={ `text-collapsible ${isExpanded ? 'is--expanded' : ''}` }>
        <div className="text-collapsible__wrapper">
          { children }
        </div>
        <a
          role="button"
          tabIndex={ 0 }
          onClick={ this.handleToggle }
          className="text-collapsible__read-more">
          {isExpanded ? 'Read less' : 'Read more'}
        </a>
      </div>
    );
  }
}

export default TextCollapsible;
