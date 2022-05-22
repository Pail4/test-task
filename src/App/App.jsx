import './App.css';
import React from 'react';
import { EntityList } from '../EntityList/EntityList';
import { PropList } from '../PropList/PropList';
import { Button } from '../Button/Button';
import { Tree } from '../store/store';

const myTree = new Tree();
myTree.getTree("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62");
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
