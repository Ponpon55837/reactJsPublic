import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../redux/actions.jsx'
class ControlPanel extends Component {
  // incrementHandler = (event) => {
  //   // 這邊同樣是由外部傳入increment這個function來使用，所以要用this.props.increment
  //   this.props.increment()
  // }
  //
  // decrementHandler = (event) => {
  //   // 這邊同樣是由外部傳入decrement這個function來使用，所以要用this.props.decrement
  //   this.props.decrement()
  // }

  render = () => {
    return (
      <React.Fragment>
        <button type="button" onClick={this.props.increment}>INCREMENT</button><br />
        <button type="button" onClick={this.props.decrement}>DECREMENT</button><br />
      </React.Fragment>
    )
  }
}

// const物件mapDispatchToProps去塞入increment, decrement這兩個function
const mapDispatchToProps = { increment, decrement }

// 使用connect把mapDispatchToProps傳入funcForControlPanel
// let funcForControlPanel = connect(null, mapDispatchToProps)
// 再由ControlPanelcontainer透過funcForControlPanel把increment, decrement傳進ControlPanel中來使用
// let ControlPanelContainer = funcForControlPanel(ControlPanel)


// 這個export 由 connect(null, mapDispatchToProps)  funcForControlPanel(ControlPanel) 兩個合併簡化而來
export default connect(null, mapDispatchToProps)(ControlPanel)
