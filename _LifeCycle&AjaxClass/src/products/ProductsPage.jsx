import React from 'react'

class ProductsPage extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    const {productService} = this.props
    // 這裡的getProductdsFromServer是由外部App.jsx導入，才能去要到在ProductService.js裡面的function
    productService.getProductdsFromServer()
  }

  render = () => {
    console.log("ProductsPage Render")
    // products由App.jsx外部傳入ProductsPage.jsx
    const {products} = this.props
    const count = products.length
    return(
      <div>
        <div>ProductsPage</div>
        <div>Has {count} products</div>
      </div>

    )
  }
}

export default ProductsPage
