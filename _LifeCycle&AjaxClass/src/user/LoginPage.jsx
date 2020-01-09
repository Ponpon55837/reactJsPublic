import React from 'react'

class LoginPage extends React.Component{
  constructor(props){
    super(props)

    // 因為這個state的內容只在這個頁面裡面進行，所以不用提取到外面的App.jsx中
    this.state = {
      username: "",
      password: "",
    }

    this.form = React.createRef()
  }

  // 利用componentDidMount,在載入時進行網址的改寫,但是不進行頁面的重新導向
  componentDidMount = () => {
    window.history.pushState("", "", '/_LifeCycle&AjaxClass/user/login/index.html')
  }

  // 如果寫在constructor裡面會撈不到user當下改變的資料
  // redirectIfLogin = async () => {
  //   // 因為userService是從App.jsx中state來使用，props導入LoignPage.jsx
  //   const userService = this.props.userService
  //   try {
  //     // 這邊await 去使用從App.jsx中import進來的userService.js底下的getUserFromServer function
  //     await userService.getUserFromServer()
  //   } catch (error) {
  //     this.showError(error)
  //   }
  // }

  // 因為撈取fetch要使用非同步的方式，所以要用async跟await，不然會撈不到資料
  fetchData = async () => {
    // 因為userService是從App.jsx中state來使用，props導入LoignPage.jsx
    const userService = this.props.userService
    try {
      // 這邊await 去使用從App.jsx中import進來的userService.js底下的logIn function
      await userService.logIn(this.state.username, this.state.password)
      console.log("fetchData : " + this.state.username)
    } catch (error) {
      this.showError(error)
    }
  }

  login = (e) => {
    console.log('login :' + this.state.username)
    this.fetchData()
    console.log("login : " + this.fetchData)
    e.preventDefault()
  }

  showError = (error) => {
    this.setState({error: error})
  }

  handler = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render = () => {
    return(
      <div>
        <form ref={this.form}>
          <h1>Log In</h1>
          <p>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handler}
            />
          </p>
          <p>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handler}
            />
          </p>
          {
            this.state.error ? (
              <p style={{color: 'red'}}>
                <h4>Error : {error.message}</h4>
              </p>
            ) : null
          }
          <button type="submit" onClick={this.login}>Login</button>
        </form>
      </div>
    )
  }
}

export default LoginPage
