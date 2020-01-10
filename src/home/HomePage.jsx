import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { merge, bounce, fadeInDownBig, rotateInDownLeft, zoomInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium'

const divCenter = {
  position: 'absolute', left: '50%', top: '50%',
  transform: 'translate(-50%, -50%)'
}

const rotateInDownLeftZoomInLeft = merge(rotateInDownLeft, zoomInLeft)

const styles = {
  bounce: {
    animation: 'x 1s',
    animationName: Radium.keyframes(bounce, 'bounce')
  },
  fadeInDownBig: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeInDownBig, 'fadeInDownBig')
  },
  rotateInDownLeftZoomInLeft: {
    animation: 'x 3s',
    animationName: Radium.keyframes(rotateInDownLeftZoomInLeft, 'rotateInDownLeftZoomInLeft')
  }
}


class HomePage extends Component {
  constructor(props) {
	super(props)
  	this.state = {
  		hover: false
  	}
  }

  toggleHover = () => {
    this.setState({hover: !this.state.hover})
  }

  render = () => {
    console.log("HomePage render");

    let linkStyle
    if(this.state.hover){
      linkStyle = [divCenter, styles.rotateInDownLeftZoomInLeft]
    }
    else {
      linkStyle = [divCenter, styles.bounce]
    }

    return (
      <StyleRoot>
        <div style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>HomePage</div>
      </StyleRoot>
    )
  }
}

export default HomePage
