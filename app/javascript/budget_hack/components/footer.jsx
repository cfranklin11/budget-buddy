/* eslint jsx-a11y/tabindex-no-positive: 0 */

import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" tabIndex="0">
      <span aria-label="budget hackathon 2017" className="footer__logo">
        BUDGETHACK 2017
      </span>
      <br />
      <span aria-hidden="true" tabIndex="-1" className="footer__info">
        Made with lot of ☕ by <a tabIndex="-1" href="https://github.com/cfranklin11/budget-hack-2017">The Hippo’s stripes</a>
      </span>
      <nav>
        <ul className="footer-nav" tabIndex="1">
          <li><a href="https://github.com/meligatt/budgethack2017_frontend">About</a></li>
          <li><a href="https://github.com/meligatt/budgethack2017_frontend">Github</a></li>
          <li><a href="https://github.com/meligatt/budgethack2017_frontend">Contact</a></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
