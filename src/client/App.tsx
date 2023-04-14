import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import BracketLeaf from './../client/components/BracketLeaf'
import './App.css'
import BracketNode from './../client/components/BracketNode'

function App() {
  const [count, setCount] = useState(0)

  const data = {
    left: {
      name: 'Red Dead Redemption 2',
      votes: 4
    },
    right: {
      name: 'Ocarina of Time',
      votes: 6
    }
  }

  return (
    <div className="App">
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      

      <BracketNode data={data} />
    </div>
  )
}

export default App
