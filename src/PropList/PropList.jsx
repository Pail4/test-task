import './PropList.css';

import React from 'react';
import { observer } from 'mobx-react-lite';

export const PropList = observer(({ store }) => {
  const node = store.selectedNode || {};
  return (
    <div className='PropList'>
      <Prop name="Label">{node.label}</Prop>
      <Prop name="Id">{node.id}</Prop>
      <Prop name="Parent Id">{node.parentId}</Prop>
    </div>
  );
});

function Prop({ name, children }) {
  return (
    <div className='Prop'>
      {name + ': ' + (children || "-")}
    </div>
  );
}
