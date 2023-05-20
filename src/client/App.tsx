import { Fragment, useState } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BracketLeaf from './../client/components/BracketLeaf';
import './App.css';
import BracketNode from './../client/components/BracketNode';
import Input from './components/Input';
import CreateBracket from './components/CreateBracket';
import Home from './components/pages/home';

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
    <Fragment>
      <div className='App'>
        <h3>Bracketeer</h3>
        {/* Insert nav here later */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateBracket />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
