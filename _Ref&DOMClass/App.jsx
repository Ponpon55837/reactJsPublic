import React from 'react'
import ReactDOM from 'react-dom'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {}

    this.thisForm = React.createRef()
  }

  static getDerivedStateFromProps = (props, state) => {
    return null
  }

  componentDidMount = () => {
    //this.thisForm.current.submit()
  }

  handler = () => {}

  submitComponent = (e) => {
    e.preventDefault()
    console.log("check this")

    // 這邊的current就代表ref={thisForm}放的那個東西,在這邊就是這個form
    // 用id的寫法則有兩種
    // 當<form id="thisForm"> 使用window.thisForm.submit() or thisForm = document.querySelector('#thisForm') thisForm.submit()
    //this.thisForm.current.submit()
  }

  render = () => {
    return (
      <div>
        <div>TEST</div>
        <form ref={this.thisForm}>
          <input type="text" name="value" value="" /><br />
          <button type="submit" onClick={this.submitComponent}>Submit</button>
        </form>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.querySelector('#root'))
