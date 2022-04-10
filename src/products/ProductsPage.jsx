import React, { Component } from 'react'
import { Jumbotron, Button, Container, Row, Col} from 'react-bootstrap'
import Contacts from './Contacts.jsx'

const jumbotronStyle = {
  marginTop:'1rem',
}

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

    // api using
    fetch('https://vuetest-69b45.firebaseapp.com/json/contact.json')
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
      <Container maxWidth="xl">
        <Row>
          <Col md={12}>
            <Jumbotron style={jumbotronStyle}>
              <h1>Welcome to Product</h1>
              <p>
                That Has {count} products
              </p>
              <p>
                <Button variant="primary">Learn more</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Contacts contacts={this.state.contacts}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ProductsPage
