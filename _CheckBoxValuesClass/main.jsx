import React from 'react'
import ReactDOM from 'react-dom'
import css from './main.css'

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      test: 1,
      checkboxValue: 1
    }
  }
  checkedHandler = (e) => {
    let {name, value, type} = e.target
    // 因為this.state[name] == value
    // 打勾的時候是 [checkboxValue] == 1
    // 沒打勾的時候是 [1] == 1
    // 所以沒打勾的時候把value改為null
    if( type == "checkbox" && this.state[name] == value){
      value = null
    }
    this.setState({ [name] : value }, () =>{
      console.log(this.state)
    })
  }

  radioHandler = (e) => {
    const { value, name} = e.target
    this.setState({ [name] : value}, () => {
      console.log(this.state)
    })
  }

  render(){
    let radioButtonValue = [1, 2, 3]
    const checkboxChecked = (this.state.checkboxValue == 1)
    const checkboxClassName = checkboxChecked ? "active" : ""
    return (
      <form>
        <label className={checkboxClassName}>
          <input
            name="checkboxValue"
            type="checkbox"
            value="1"
            checked={checkboxChecked}
            onChange={this.checkedHandler}
          />
          test1
        </label><br />
        { radioButtonValue.map( (value) => {
            const checked = (value == this.state.test)
            const className = checked ? "active" : ""
            return (
              <label className={className}>
                <input
                  name="test"
                  type="radio"
                  value={value}
                  defaultChecked={checked}
                  onChange={this.radioHandler}
                />
                test{value}
              </label>
            )
          })
        }
        <button type="submit">submit</button>
      </form>
    )
  }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
