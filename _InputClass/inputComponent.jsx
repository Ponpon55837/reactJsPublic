import React from 'react'
import ReactDOM from 'react-dom'
class Test extends React.Component{
  constructor(props){
    // 要使用super() 來使用constructor原本的東西
    super(props)
    // 設定初始的state 這樣才能在後面用setState來改變state的內容
    this.state = {
        value: "Input Something",
    }
  }
  // 自定義 給onChange使用 為了可以改變value值
  inputHandler(e){
    console.log(e.target.value)
    this.setState({value:e.target.value})
  }
  // onChange要用bind把值綁進去這樣value值改變的時候才會跟著改變
  render(){
    return (
      <form>
        <label>
          Name:
          <input type="text" name="name"  value={this.state.value} onChange={this.inputHandler.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

// render的時候要把class當作 <html />物件包起來,抓到要放的id或class裡面
ReactDOM.render(<Test />, document.querySelector('#root'))
