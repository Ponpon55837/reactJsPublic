import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import UserService from './utils/UserService'
import ProductService from './utils/ProductService'
import AppRouter from './layout/AppRouter.jsx'
import Nav from './layout/Nav.jsx'


// 為了讓async await能跑才要import這個進來
import 'babel-polyfill'


// 取得UserService資料
const userService = new UserService();
// 取得ProductService資料
const productService = new ProductService();


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 從UserService.js中撈取currentUser資料
      user: userService.currentUser,
      // 從ProductService.js中撈取products資料
      products: productService.products
    }

    // 使用UserService.js底下的register這個function塞入user資料，只要在最上層的state裡面有進行註冊，其他下層就都可以使用
    userService.register((user) => {
      this.setState({ user: user })
    })

    // 使用ProductService.js底下的register這個function塞入user資料，只要在最上層的state裡面有進行註冊，其他下層就都可以使用
    productService.register((products) => {
      this.setState({ products: products })
    })
  }

  render = () => {
    // 這邊把Nav獨立出來是為了讓改變UI時不會變得很亂很複雜
    // 因為Nav是被 AppRouter包住的，所以在AppRouter.jsx的Router要使用this.props.children來使用
    // 要把資料傳近Nav裡面才能使用Nav的連結
    return (
      <AppRouter
        userService={userService}
        user={this.state.user}
        productService={productService}
        products={this.state.products}
      >
        <Nav
          userService={userService}
          user={this.state.user}
          productService={productService}
          products={this.state.products} />
      </AppRouter>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
