import React from 'react'
class Result extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <h1>Count_add_plus：{this.props.count}</h1>
    )
  }
}

// export到setState.jsx
export default Result
