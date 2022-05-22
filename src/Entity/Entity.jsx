import './Entity.css';

import React from 'react';
import { observer } from 'mobx-react-lite';

export const Entity = observer(({ label, id, nested, onClick, store }) => {
  const width = (400 - nested * 25) || 25;
  return (
    <div
      className={'Entity ' + 'Entity_chosen'.repeat(store.selectedNode.id === id)}
      style={{ width }}
      onClick={onClick}>
      {label}
    </div>
  );
});
