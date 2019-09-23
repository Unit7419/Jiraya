import React from 'react'
import logo from '@root/logo.svg'
import './index.css'

import APIS from '@app/apis'

fetch(APIS.queryIncomeDetail, {method: 'post'})

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="test">react-template</div>

        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="logo-test" alt="logo" />
      </header>
    </div>
  )
}

export default App
