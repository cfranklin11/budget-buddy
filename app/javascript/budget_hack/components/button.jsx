import React from 'react';

const Button = ({ label, icon, onClick }) => {
  return (
    <button
      className="button button--action"
      type="button"
      onClick={ onClick }>
      <span>{ label }</span>
      <i className="material-icons">{ icon }</i>
    </button>
  );
};
export default Button;
