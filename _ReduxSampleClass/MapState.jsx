import React, { Component } from 'react'
import { connect } from 'react-redux'
import ControlPanel from './component/ControlPanel.jsx'
import { getCounter } from './redux/selectors.jsx'

class MapState extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    return (
      // 這邊不再是使用{this.state.counter}，是因為counter是由在外部傳入
      // 由createStore產生，再由mapStateToProps這個function來return到funcForApp這個function
      // 再由AppContainer = funcForApp(App)傳入，所以使用的是{this.props.counter}
      <div>
        <p>{this.props.counter}</p>
        <ControlPanel />
      </div>
    )
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: getCounter(state)
  }
}

// let funcForApp = connect(mapStateToProps, null)
// 因為這邊AppContainer 已經取代由funcForApp傳入的App
// 可以想像成<AppContainer /> 取代 <MapState />
// let AppContainer = funcForApp(MapState)

// 這個export由connect(mapStateToProps, null) 和 AppContainer = funcForApp(App) 簡化而來
export default connect(mapStateToProps, null)(MapState)
