import './PropList.css';

import React from 'react';

export function PropList() {
  return (
    <div className='PropList'>
      <Prop name="Label"></Prop>
      <Prop name="Id"></Prop>
      <Prop name="Parent Id"></Prop>
    </div>
  );
}

function Prop({ name, children }) {
  return (
    <div className='Prop'>
      {name + ': ' + children}
    </div>
  );
}
