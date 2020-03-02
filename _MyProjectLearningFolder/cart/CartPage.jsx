import React, { Component } from 'react'
import { Jumbotron, Button, Container, Row, Col} from 'react-bootstrap'
import CartPageBread from './CartPageBread.jsx'
import ParkAPI from './ParkAPI.jsx'

const jumbotronStyle = {
  marginTop:'1rem',
}

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

    const { parkAPI } = this.state

    return (
      <Container maxWidth="xl">
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Jumbotron style={jumbotronStyle}>
              <h1>Welcome to CartPage</h1>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
            <CartPageBread />
          </Col>
          <Col md={1}></Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <ParkAPI parkAPI={parkAPI}/>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    )
  }
}

export default CartPage
