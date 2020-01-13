import React from 'react'
import ReactDOM from 'react-dom'
import css from '../lib/css/main.css'
import Result from './Result.jsx'

class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        count: 0,
    }
  }
  countAddOneHandler(e){
    let {count} = this.state
    this.setState({count:count + 1})
    // 簡寫的話
    // this.setState({count:this.state.count + 1})
  }
  render(){
    return (
      <div>
        <Result count={this.state.count}/>
        <button type="button" onClick={this.countAddOneHandler.bind(this)}>Click</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter value="test"/>, document.querySelector('#root'))
