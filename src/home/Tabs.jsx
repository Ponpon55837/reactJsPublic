import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Tab } from 'react-bootstrap'
import Radium, {StyleRoot} from 'radium'

class TabHomePage extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }

  render = () => {
    return (
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <p>When my love swears that she is made of truth, I do believe her though I know she lies, That she might think me some untutor'd youth, Unlearned in the world's false subtleties. Thus vainly thinking that she thinks me young, Although she knows my days are past the best, Simply I credit her false-speaking tongue: On both sides thus is simple truth suppressed: But wherefore says she not she is unjust? And wherefore say not I that I am old?</p>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <p>When my love swears that she is made of truth, I do believe her though I know she lies, That she might think me some untutor'd youth, Unlearned in the world's false subtleties. Thus vainly thinking that she thinks me young, Although she knows my days are past the best, Simply I credit her false-speaking tongue: On both sides thus is simple truth suppressed: But wherefore says she not she is unjust? And wherefore say not I that I am old?</p>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <p>When my love swears that she is made of truth, I do believe her though I know she lies, That she might think me some untutor'd youth, Unlearned in the world's false subtleties. Thus vainly thinking that she thinks me young, Although she knows my days are past the best, Simply I credit her false-speaking tongue: On both sides thus is simple truth suppressed: But wherefore says she not she is unjust? And wherefore say not I that I am old?</p>
        </Tab>
      </Tabs>
    )
  }
}

export default TabHomePage
