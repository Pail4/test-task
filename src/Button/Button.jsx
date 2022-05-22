import './Button.css';

import React from 'react';

export const Button = (props) => {
  return (
    <button className='Button' onClick={props.onClick}>
      {props.children}
    </button>
  );
};
