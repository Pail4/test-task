import './Window.css';

import React from 'react';
import { EntityList } from '../EntityList/EntityList';
import { PropList } from '../PropList/PropList';

export function Window() {
  return (
    <div className='window'>
      <EntityList>

      </EntityList>
      <PropList>

      </PropList>
    </div>
  );
}