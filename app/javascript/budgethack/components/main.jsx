import React, { PropTypes, PureComponent } from 'react';
import NavMenu from './nav-menu';
import Footer from './footer';

export default class Main extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render () {
    return (
      <div>
        <div className="page-wrap">
          <NavMenu />
          {React.cloneElement(this.props.children, this.props)}
        </div>
        <Footer />
      </div>
    );
  }
}
