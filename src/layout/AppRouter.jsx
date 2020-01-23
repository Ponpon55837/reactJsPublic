import React, { Component } from 'react'
import UserPage from '../user/UserPage.jsx'
import LoginPage from '../user/LoginPage.jsx'
import CartPage from '../cart/CartPage.jsx'
import ProductsPage from '../products/ProductsPage.jsx'
import HomePage from '../home/HomePage.jsx'
import Footer from './Footer.jsx'

// 原本應該要用<BrowserRouter>，但是用 as Router 之後就可以改成<Router>
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"

class AppRouter extends Component {
  constructor(props){
    super(props)
  }

  render = () => {
    // {this.props.children}，由App.jsx傳入，使用被AppRouter包住的Nav來做Nav中的Link
    // <main className="mdc-top-app-bar--fixed-adjust"> 是用來做Navigation的 material design 套件
    return (
      <Router>
        {this.props.children}
        <main className="mdc-top-app-bar--fixed-adjust">
          <Route exact path="/" component={HomePage} />
          <Route path="/products/" render={(props) =>
            <ProductsPage productService={this.props.productService} products={this.props.products} {...props} /> }
          />
          <Route
            path="/cart/"
            render={(props) =>
              (
                // 判斷user有沒有登入
                // 有登入的話顯示CartPage頁面的內容，並把值傳入
                // 沒有的話重新導向到user底下的logIn畫面
                this.props.userService.isLoggedIn() ?
                  <CartPage
                    userService={this.props.userService}
                    user={this.props.user}
                    productService={this.props.productService}
                    products={this.props.products}
                    {...props}
                  /> :
                  <Redirect to="/user/logIn/" />
              )
            }
          />
          <Route
            exact
            path="/user/"
            render={(props) =>
              (
                // 判斷user有沒有登入
                // 有登入的話顯示UserPage頁面的內容，並把值傳入
                // 沒有的話重新導向到user底下的logIn畫面
                this.props.userService.isLoggedIn() ?
                  <UserPage
                    user={this.props.user}
                    userService={this.props.userService}
                    {...props}
                  /> :
                  <Redirect to="/user/logIn/" />
              )
            }
          />
          <Route
            path="/user/logIn"
            render={(props) =>
              (
                // 判斷user有沒有登入
                // 有登入的話導向到UserPage頁面的內容，並把值傳入
                // 沒有的話顯示logIn畫面
                this.props.userService.isLoggedIn() ?
                <Redirect to="/user/" /> :
                <LoginPage user={this.props.user} userService={this.props.userService} {...props} />
              )
            }
          />
          <Footer />
        </main>
      </Router>
    )
  }
}

export default AppRouter
