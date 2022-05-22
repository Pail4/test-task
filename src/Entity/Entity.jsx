import './Entity.css';

import React from 'react';

export const Entity = ({ label, nested, onClick/*, id, parentId, nested*/ }) => {
  const width = (400 - nested * 25) || 25;
  return (
    <div className='Entity' style={{width}} onClick={onClick}>
      {label}
    </div>
  );
};
