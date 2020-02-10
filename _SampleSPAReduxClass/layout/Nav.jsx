import React, { Component } from 'react'
// 原本應該要用<BrowserRouter>，但是用 as Router 之後就可以改成<Router>
import { Link } from "react-router-dom"

class Nav extends Component {
  constructor(props) {
    super(props)
  }


  render = () => {
    return (
      <React.Fragment>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products/" onClick={this.closeDrawer}>Products</Link>
          </li>
          {
            // 判斷userService有沒有被登入，使用UserService.js底下的isLoggIn這個function
            // 有登入的話就顯示cart跟user兩個連結選項
            // 沒登入的話則顯示user底下的logIn
            this.props.userService.isLoggedIn() ?
            (
              // React.Fragment用來取代原本的div這樣在網頁上就不會看到內容被包起來的情況
              <React.Fragment>
                <li>
                  <Link to="/cart/" onClick={this.closeDrawer}>Cart</Link>
                </li>
                <li>
                  <Link to="/user/" onClick={this.closeDrawer}>Profile</Link>
                </li>
              </React.Fragment>
            ) :
            (
              <li>
                <Link to="/user/logIn" onClick={this.closeDrawer}>Log In</Link>
              </li>
            )
          }
        </ul>
      </React.Fragment>
    )
  }
}

export default Nav
