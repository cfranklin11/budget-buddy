import React from 'react';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
        <footer className="footer">
          <span className="footer__logo">BUDGETHACK 2017</span>
          <br />
          <span  className="footer__info">Made with lots of ☕☕☕  by <a href="https://github.com/cfranklin11/budget-hack-2017">The Hippo’s stripes</a></span>
          <br />
          <span  className="footer__social">twitter | facebook | google +</span>
        </footer>
    );
  }
}
export default Footer;
