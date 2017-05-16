import React from 'react';
import { Link } from 'react-router';

class NavMenu extends React.Component {
  render () {
    return (
      <div className="nav-bar-menu">
        <div className="navBar">
          <nav className="wrapper">
            <div className="logo">
              <Link to="/">
                <i className="material-icons">monetization_on</i>
                <span className="logo__app-name">Budget Buddy</span>
              </Link>
            </div>
            <div className="menu-accessibility">
              <span className="menu-accessibility__tonality">
                <i className="material-icons">tonality</i>
              </span>
              <span className="menu-accessibility__screen-reader">
                <i className="material-icons">accessibility</i>
              </span>
              <span className="menu-accessibility__hamburger">
                <i className="material-icons">menu</i>
              </span>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
export default NavMenu;
