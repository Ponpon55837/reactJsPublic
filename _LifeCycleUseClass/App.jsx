import React from 'react'
import ReactDOM from 'react-dom'
import Content from './Content.jsx'
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
    console.log("App: constructor")
  }

  // 用來替換componentWillMount
  static getDerivedStateFromProps = (props, state) => {
    console.log("App: getDerivedStateFromProps")

    return null
  }

  // WillMount就是即將安裝的意思 但是在新的版本將要被移除了 要繼續使用的話要改成UNSAFE_componentWillMount 不過也會被替換掉
  // componentWillMount = () => {
  //   console.log("componentWillMount")
  // }

  // DidMount就是正在安裝的意思
  componentDidMount = () => {
    console.log("App: componentDidMount")
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log("App: shouldComponentUpdate")

    return true // 放false的話count就不會加
  }

  // 要跟下面的componentDidUpdate一起使用，這裡的回傳值是componentDidUpdate的傳入值
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log("App: getSnapshotBeforeUpdate")

    return 1
  }

  // 這邊的componentDidUpdate要配合上面的getSnapshotBeforeUpdate使用
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log("App: componentDidUpdate")
    console.log(snapshot)
  }

  // WillUnmount就是解除安裝的意思
  componentWillUnmount = () => {
    console.log("App: componentWillUnmount")
  }

  addCountHandler = () => {
    const count = this.state.count
    this.setState({
      count: count + 1
    }, () => {
      console.log(this.state)
    })
  }

  render = () => {
    console.log("App: render")
    return (
      <div>
        <h1>TEST</h1>
        {
          // 如果count 大於5就只會跑App的render內容，小於5的話會兩個一起render
          this.state.count > 5 ? ("") : <Content />
        }
        <p>Count: {this.state.count}</p>
        <button type="button" onClick={this.addCountHandler}>ADD</button>
      </div>
    )
  }

}

ReactDOM.render(<App />, document.querySelector('#root'))
