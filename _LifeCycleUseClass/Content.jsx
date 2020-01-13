import React from 'react'
class Content extends React.Component{
  constructor(props){
    super(props)
    this.state = {}

    console.log("Content: constructor")
  }

  // 用來替換componentWillMount
  static getDerivedStateFromProps = (props, state) => {
    console.log("Content: getDerivedStateFromProps")

    return null
  }

  // WillMount就是即將安裝的意思 但是在新的版本將要被移除了 要繼續使用的話要改成UNSAFE_componentWillMount 不過也會被替換掉
  // componentWillMount = () => {
  //   console.log("componentWillMount")
  // }

  // DidMount就是正在安裝的意思
  componentDidMount = () => {
    console.log("Content: componentDidMount")
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log("Content: shouldComponentUpdate")

    return true // 放false的話count就不會加
  }

  // 要跟下面的componentDidUpdate一起使用，這裡的回傳值是componentDidUpdate的傳入值
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log("Content: getSnapshotBeforeUpdate")

    return 1
  }

  // 這邊的componentDidUpdate要配合上面的getSnapshotBeforeUpdate使用
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    console.log("Content: componentDidUpdate")
    console.log(snapshot)
  }

  // WillUnmount就是解除安裝的意思
  componentWillUnmount = () => {
    console.log("Content: componentWillUnmount")
  }

  render = () => {
    console.log("Content: render")
    return (
      <p>Content Test</p>
    )
  }
}

export default Content
