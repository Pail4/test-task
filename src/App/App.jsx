import './App.css';
import React from 'react';
import { EntityList } from '../EntityList/EntityList';
import { PropList } from '../PropList/PropList';
import { Button } from '../Button/Button';

function App() {
  return (
    <div className="App">
      <div className='ListWrap'>
        <EntityList>

        </EntityList>
        <PropList>

        </PropList>
      </div>
      <div className='Buttons'>
        <Button>Apply</Button>
        <Button>Delete</Button>
        <Button>Refresh</Button>
      </div>
    </div>
  );
}

export default App;
