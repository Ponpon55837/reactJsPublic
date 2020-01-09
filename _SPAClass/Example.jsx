import React from "react"
import {BrowserRouter as Router,  Switch,  Route,  Link} from "react-router-dom"
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import About from './About.jsx'
import Topics from './Topics.jsx'
import PageNotFound from './PageNotFound.jsx'

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" render={ props => <Dashboard {...props} user={123} /> } />
          <Route path="/topics" component={Topics} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default BasicExample
