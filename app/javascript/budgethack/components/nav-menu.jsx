import React from 'react';
import { Link } from 'react-router';

class NavMenu extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <div className="nav-bar-menu">
      <nav className="navBar">
        <nav className="wrapper">
          <div className="logo">
            <Link to="/">Budget Buddy</Link>
          </div>
            <label htmlFor="menu-toggle" className="label-toggle"></label>
          <ul>
            <li><a href="https://github.com/meligatt/budgethack2017_frontend">About</a></li>
            <li><a href="https://github.com/meligatt/budgethack2017_frontend">Github</a></li>
            <li><a href="https://github.com/meligatt/budgethack2017_frontend">Contact</a></li>
          </ul>
        </nav>
      </nav>
      </div>
    );
  }
}
export default NavMenu;
