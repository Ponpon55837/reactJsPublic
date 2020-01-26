import React, { Component } from 'react'
import { Jumbotron, Button, Container, Row, Col} from 'react-bootstrap'
import Contacts from './Contacts.jsx'

class ProductsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
  }

  componentDidMount = () => {
    const {productService} = this.props
    // 這裡的getProductdsFromServer是由外部App.jsx導入，才能去要到在ProductService.js裡面的function
    productService.getProductsFromServer()
  }

  componentDidMount = () => {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render = () => {
    console.log("ProductsPage render");
    // products由App.jsx外部傳入ProductsPage.jsx
    const {products} = this.props
    const count = products.length
    return (
      <Container lg={12} md={8} sm={4} xl={0} xs={0}>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <Jumbotron>
              <h1>Welcome to Product</h1>
              <p>
                THas {count} products
              </p>
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
            <Contacts contacts={this.state.contacts}/>
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
    )
  }
}

export default ProductsPage
