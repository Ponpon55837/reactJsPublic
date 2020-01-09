import React from 'react'
import ReactDOM from 'react-dom'
class InputTextWithPreview extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title: 'input'
    }
  }
  // 這邊使用babel的properties plugin 所以才能在class裡面直接使用箭頭函數而不是需要在constructor裡面寫this.handler = this.handler.bind(this)
  handler = (element) => {
    const {name,value} = element.target
    // 這邊的[name]是拿來當作上面this.state的title來用的 因為這樣才可以當作key值
    this.setState({ [name] : value }, () =>{
        console.log(this.state)
      })
    }
  render(){
    return (
      <div>
        <h1>{this.state.title}</h1>
        <input
          text="text"
          name="title"
          value={this.state.title}
          // 這邊的onChange已經在constructor裡面bind(this)過了
          onChange={this.handler}
        />
      </div>
    )
  }
}

ReactDOM.render(<InputTextWithPreview />, document.querySelector('#root'))
