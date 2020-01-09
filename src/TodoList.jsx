import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { merge, bounce, fadeInDownBig, rotateInDownLeft, zoomInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium';

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

class TodoList extends Component {
  constructor (props) {
    super (props)

  }

  render = () => {
    return (
      <StyleRoot>
        <div className="todoListMain" style={divCenter, styles.rotateInDownLeftZoomInLeft}>
          <div className="header">
            <label >Title</label>
            <form>
              <input  type="input" />
              <button type="submit" className='AddTaskBtn' > Add Task </button>
            </form>
          </div>
        </div>
      </StyleRoot>
    )
  }
}

export default TodoList
