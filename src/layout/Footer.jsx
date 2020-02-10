import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col} from 'react-bootstrap'

const fatFooter = {
  // position: 'fixed',
  height: 'auto',
  bottom: '0',
  width: '100%',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  textAlign: 'center',
  paddingTop: '25px',
  paddingBottom: '25px',
}

const fatFooterMargin = {
  marginTop: '30px',
  marginBottom: '30px',
}

class Footer extends Component {
  constructor (props) {
    super (props)
  }

  render = () => {
    return (
      <div style={fatFooter}>
        <Container>
          <Row>
            <Col></Col>
            <Col>Copyright by @upfloor5 2020</Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer
