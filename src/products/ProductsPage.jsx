import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
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
      <div>
        <Jumbotron>
          <h1>Welcome to Product</h1>
          <p>
            THas {count} products
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <Contacts contacts={this.state.contacts}/>
      </div>
    )
  }
}

export default ProductsPage
