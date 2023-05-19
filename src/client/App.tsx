import { useState } from 'react';
import BracketLeaf from './components/drafts/BracketLeaf';
import './App.css';
import BracketNode from './components/drafts/BracketNode';
import Input from './components/Input';
import CreateBracket from './components/CreateBracket';
import Bracket from './components/Bracket';

function App() {
  const [count, setCount] = useState(0);

  const data = {
    left: {
      name: 'Red Dead Redemption 2',
      votes: 4,
    },
    right: {
      name: 'Ocarina of Time',
      votes: 6,
    },
  };

  return (
    <div className='App'>
      <h3>App</h3>
      {/* <Input /> */}
      <Bracket />
      {/*<BracketNode data={data}/>*/}
    </div>
  );
}

export default App;
