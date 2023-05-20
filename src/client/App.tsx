import { Fragment, useState } from 'react';
import { HashRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import CreateBracket from './components/CreateBracket';
import Home from './components/pages/home';
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
    <Fragment>
      <div className='App'>
        <h3>Bracketeer</h3>
        {/* Insert nav here later */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreateBracket />} />
          <Route path='/sample-render' element={<Bracket />} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;
