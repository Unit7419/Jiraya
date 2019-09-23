import * as React from 'react'
import 'es6-promise'

import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from 'mobx-react'
import routes from './routes'

console.log(routes)

if (process.env.PROJECT_ENV !== 'production') {
  console.log('[current running env]', process.env.NODE_ENV)
  console.log('[current api env]', process.env.PROJECT_ENV)
}

export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            <Redirect path="/" to={{pathname: '/index'}} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
