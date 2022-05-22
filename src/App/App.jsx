import './App.css';
import React from 'react';
import { EntityList } from '../EntityList/EntityList';
import { PropList } from '../PropList/PropList';
import { Button } from '../Button/Button';
import { observer } from 'mobx-react-lite';
import tree from '../store/store';

const App = observer(() => {
  return (
    <div className="App">
      <div className='ListWrap'>
        <EntityList store={tree}>

        </EntityList>
        <PropList store={tree}>

        </PropList>
      </div>
      <div className='Buttons'>
        <Button onClick={() => tree.sendTree()}>Apply</Button>
        <Button onClick={() => tree.deleteNode(tree.selectedNode)}>Delete</Button>
        <Button onClick={() => tree.fetchTree()}>Refresh</Button>
      </div>
    </div>
  );
});

export default App;
