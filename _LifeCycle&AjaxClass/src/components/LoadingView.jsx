import React from 'react'

class LoadingView extends React.Component{
  constructor(props){
    super(props)

    this.viewRef = React.createRef()
    this.str = "Loading"
  }

  componentDidMount = () => {
    this.timer = setInterval( () => {
      if(this.str.length < 13){
        this.str = this.str + '.'
        this.viewRef.current.innerHTML = this.str
      }
    },500)
  }

  componentWillUnMount = () => {
    if(this.timer){
      clearInterval(this.timer)
    }
  }

  render = () => {
    return(
      <div><h1 ref={this.viewRef}>{this.str}</h1></div>
    )
  }
}

export default LoadingView
