import './App.css';
import React from 'react';
import { EntityList } from '../EntityList/EntityList';
import { PropList } from '../PropList/PropList';
import { Button } from '../Button/Button';
import { Observer, observer } from 'mobx-react-lite';
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
        <Button>Apply</Button>
        <Button onClick={() => <Observer>{tree.deleteNode(tree.selectedNode)}</Observer>}>Delete</Button>
        <Button onClick={() => tree.fetchTree()}>Refresh</Button>
      </div>
    </div>
  );
});

export default App;
