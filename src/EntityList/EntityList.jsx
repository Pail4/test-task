import './EntityList.css';

import React from 'react';
import { Entity } from '../Entity/Entity';
import { observer } from 'mobx-react-lite';

export const EntityList = observer(({ store }) => {
  function createList() {
    const list = [];
    store.traversal((node, nested) => {
      const { label, id, parentId } = node;
      if (!id) return;
      list.push(
        <Entity
          store={store}
          key={id}
          label={label}
          id={id}
          parentId={parentId}
          nested={nested}
          onClick={() => store.chooseNode(node)}
        />
      );
    });
    return list;
  }
  const list = createList();
  return (
    <div className='EntityList'>
      {list}
    </div>
  );
});
