import React from 'react';
import NavMenu from './nav-menu';
import Header from './header';
import Footer from './footer';

const Main = React.createClass({
  render () {
    return (
      <div>
        <NavMenu/>
        {/* <Header/> */}
        {React.cloneElement(this.props.children, this.props)}
        <Footer />
      </div>
    );
  },
});

export default Main;
