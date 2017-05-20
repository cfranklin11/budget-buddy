import React from 'react';

const NavMenu = () => {
  return (
    <div className="nav-bar-menu">
      <div className="navBar">
        <nav className="wrapper" role="navigation">
          <div className="logo">
            <a href="/">
              <i aria-hidden="true" className="material-icons">
                monetization_on
              </i>
              <span className="logo__app-name">Budget Buddy</span>
            </a>
          </div>
          <div tabIndex="0" className="menu-accessibility">
            <span className="menu-accessibility__tonality">
              <a aria-label="tonality" href="/">
                <i aria-hidden="true" className="material-icons">tonality</i>
              </a>
            </span>
            <span
              aria-hidden="true"
              className="menu-accessibility__screen-reader">
              <a href="/">
                <i aria-hidden="true" className="material-icons">
                  accessibility
                </i>
              </a>
            </span>
            <span className="menu-accessibility__hamburger">
              <a aria-label="mobile-menu" href="/">
                <i aria-hidden="true" className="material-icons">
                  menu
                </i>
              </a>
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavMenu;
