import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
