import React, { Component } from 'react'
import { Jumbotron, Button, Container, Row, Col} from 'react-bootstrap'
import ParkAPI from './ParkAPI.jsx'

class CartPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parkAPI: []
    }
  }

  componentDidMount = () => {
    fetch('https://vuetest-69b45.firebaseapp.com/json/parkAPI.json')
    .then(res => res.json())
    .then((data) => {
      this.setState({ parkAPI: data })
    })
    .catch(console.log)
  }

  render = () => {
    console.log("CartPage render")
    return (
      <Container maxWidth="xl">
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Jumbotron>
              <h1>Welcome to CartPage</h1>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
          </Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <ParkAPI parkAPI={this.state.parkAPI}/>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    )
  }
}

export default CartPage
