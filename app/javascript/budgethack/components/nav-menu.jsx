import React from 'react';
import { Link } from 'react-router';

class NavMenu extends React.Component {
  render () {
    return (
      <div className="nav-bar-menu">
        <div className="navBar">
          <nav className="wrapper" role="navigation">
            <div className="logo">
              <Link to="/" role="link">
                <i aria-hidden="true" className="material-icons">monetization_on</i>
                <span className="logo__app-name">Budget Buddy</span>
              </Link>
            </div>
            <div tabIndex="0" className="menu-accessibility">
              <span  className="menu-accessibility__tonality">
                <Link aria-label="tonality" to="/" role="link">
                <i  aria-hidden="true" className="material-icons">tonality</i>
              </Link>
              </span>
              <span aria-hidden="true" className="menu-accessibility__screen-reader">
                <Link to="/" role="link">
                <i  aria-hidden="true" className="material-icons">accessibility</i>
                </Link>
              </span>
              <span  className="menu-accessibility__hamburger">
                <Link aria-label="mobile-menu" to="/" role="link">
                <i aria-hidden="true" className="material-icons">menu</i>
                </Link>
              </span>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
export default NavMenu;
