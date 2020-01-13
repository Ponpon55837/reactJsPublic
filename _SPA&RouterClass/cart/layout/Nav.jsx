import React, { Component } from 'react'
// 原本應該要用<BrowserRouter>，但是用 as Router 之後就可以改成<Router>
import { Link } from "react-router-dom"
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'
import Drawer, {DrawerAppContent} from '@material/react-drawer'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 用來控制Drawer的漢堡圖示要不要打開
      open: false
    }
  }

  closeDrawer = () => {
    this.setState({open: false})
  }

  render = () => {
    return (
      <React.Fragment>
        <Drawer modal open={this.state.open} onClose={this.closeDrawer}>
          <nav>
            <ul>
              <li>
                <Link to="/" onClick={this.closeDrawer}>Home</Link>
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
          </nav>
        </Drawer>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon='menu' onClick={() => this.setState({open: !this.state.open})}/>
              </TopAppBarIcon>
              <TopAppBarTitle>Everyday we need 歡樂!</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="print page"
                  hasRipple
                  icon='print'
                  onClick={() => console.log('print')}
                />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
      </React.Fragment>
    )
  }
}

export default Nav
