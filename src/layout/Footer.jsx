import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col} from 'react-bootstrap'

const fatFooter = {
  // position: 'fixed',
  height: '100px',
  bottom: '0',
  width: '100%',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  textAlign: 'center',
}

class Footer extends Component {
  constructor (props) {
    super (props)
  }

  render = () => {
    return (
      <div style={fatFooter}>
        Copyright by @upfloor5 2020
      </div>
    )
  }
}

export default Footer
