import React from 'react';

class Footer extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
        <footer className="footer">
          BUDGETHACK 2017
          <br />
          Made with ☕ by The Hippo’s stripes
          <br />
          twitter | facebook | google +
        </footer>
    );
  }
}
export default Footer;
