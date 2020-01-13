import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TodoList from './TodoList.jsx'
import CSS from '../lib/css/main.css'

class App extends Component {
  constructor(props){
    super(props)
  }

  render = () => {
    return (
      <div className='App'>
        <TodoList />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
