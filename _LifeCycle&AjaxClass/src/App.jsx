import React from 'react'
import ReactDOM from 'react-dom'
import HomePage from './home/HomePage.jsx'
import CartPage from './cart/CartPage.jsx'
import UserPage from './user/UserPage.jsx'
import LoginPage from './user/LoginPage.jsx'
import ProductsPage from './products/ProductsPage.jsx'
import Nav from './layout/Nav.jsx'
import NavRoutes from './configs/NavRoutes.json'
import UserService from './utils/UserService.js'
import ProductService from './utils/ProductService.js'
import PathService from './utils/PathService.js'

// 為了讓async await能跑才要import這個進來
import 'babel-polyfill'


// 取得user資料
const userService = new UserService()
const productService = new ProductService()
const pathService = new PathService()

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      // 從PathService中撈取path的資料
      path: pathService.path,
      // 從UserService中撈取currentUser資料
      user: userService.currentUser,
      // 從ProductService中撈product的資料
      products: productService.products,
    }

    // 使用PathService.js底下的register這個function塞入user資料，只要在最上層的state裡面有進行註冊，其他下層就都可以使用
    pathService.register((path) => {
      this.setState({path: path})
    })

    // 使用UserService.js底下的register這個function塞入user資料，只要在最上層的state裡面有進行註冊，其他下層就都可以使用
    userService.register((user) => {
      this.setState({user: user})
    })

    // ProductService.js底下的register這個function塞入user資料，只要在最上層的state裡面有進行註冊，其他下層就都可以使用
    productService.register((products) => {
      this.setState({products: products})
    })
  }

  // 當key的內容被傳入時最後return回傳path的key陣列
  getPath = (key) => {
    const path = {
      "/_LifeCycle&AjaxClass/index.html" : <HomePage />,
      "/_LifeCycle&AjaxClass/products/index.html" : <ProductsPage products={this.state.products} productService={productService}/>,
      "/_LifeCycle&AjaxClass/user/index.html" : <UserPage user={this.state.user}/>,
      "/_LifeCycle&AjaxClass/user/login/index.html" : <LoginPage user={this.state.user} userService={userService} />,
      "/_LifeCycle&AjaxClass/cart/index.html" : <CartPage />,
    }
    return path[key]
  }

  render = () => {
    console.log("App Render")
    // page直接把this.pages裡面的路徑讀出來，然後傳到this.state的path裡面
    let page = this.getPath(this.state.path)
    // 如果id存在的話login頁面會直接載入UserPage的內容
    if(this.state.user.id){
      page = this.getPath('/_LifeCycle&AjaxClass/user/index.html')
    }
    console.log(this.state.user)
    console.log(this.state.user.id)
    // 如果使用者點進來的路徑是user/index.html 並且 user.id不存在的話，頁面導向到LoginPage
    if(this.state.path == '/_LifeCycle&AjaxClass/user/index.html' && !this.state.user.id){
      page = this.getPath('/_LifeCycle&AjaxClass/user/login/index.html')
    }
    return (
      <div>
        <Nav navRoutes={NavRoutes} pathService={pathService} {...this.state}/>
        {page}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
