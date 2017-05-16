import React from 'react';
import NavMenu from './nav-menu';
import Header from './header';
import Footer from './footer';

const Main = React.createClass({
  render () {
    return (
      <div>
        <div className="page-wrap">
          <NavMenu/>
          {React.cloneElement(this.props.children, this.props)}
        </div>
        <Footer />
      </div>
    );
  },
});

export default Main;
