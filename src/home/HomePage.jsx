import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Carousels from './Carousels.jsx'
import Cards from './Cards.jsx'
import Tabs from './Tabs.jsx'
import { merge, bounce, fadeInDownBig, rotateInDownLeft, zoomInLeft } from 'react-animations'

class HomePage extends Component {
  constructor(props) {
  	super(props)

  }

  render = () => {
    console.log("HomePage render");
    // rwd test
    return (
      <Container maxWidth="xl">
        <Row>
          <Carousels />
        </Row><br />
        <Row>
          <Cards />
        </Row><br />
        <Row>
          <Col>
            <Tabs />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HomePage
