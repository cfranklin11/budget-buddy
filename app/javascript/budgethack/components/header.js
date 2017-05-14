import React from 'react';

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    return (
      <header className="header">
        <h1 className="header__title" >CREATE & SHARE</h1>
        <p className="header__subtitle">a budget’s infographic</p>
      </header>
    );
  }
}
export default Header;
