import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import BracketLeaf from './../client/components/BracketLeaf';
import './App.css';
import BracketNode from './../client/components/BracketNode';
import Input from './components/Input';

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
      <h3>Hi</h3>
      <Input />
      {/*<BracketNode data={data}/>*/}
    </div>
  );
}

export default App;
