import React from 'react';

class TextCollapsible extends React.Component {
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
    return (
      <div className={ `text-collapsible ${isExpanded ? 'is--expanded' : ''}` }>
        <div className="text-collapsible__wrapper">
          {this.props.children}
        </div>
        <a
          onClick={ this.handleToggle }
          className="text-collapsible__read-more">
          {isExpanded ? 'Read less' : 'Read more'}
        </a>
      </div>
    );
  }
}

export default TextCollapsible;
