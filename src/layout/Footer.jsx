import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col} from 'react-bootstrap'

const fatFooter = {
  // position: 'fixed',
  height: '100px',
  bottom: '0',
  width: '100%',
}

class Footer extends Component {
  constructor (props) {
    super (props)
  }

  render = () => {
    return (
      <Container style={fatFooter}>
        hello world
      </Container>
    )
  }
}

export default Footer
